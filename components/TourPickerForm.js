import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTours } from '../api/tourData';
import { getDatesByTourId } from '../api/datesData';

const initialState = {
  id: '',
  name: '',
};
// setting id and name to an empty sting to be able to store the tour name and id when user selects.

function TourPickerForm({ obj, onSelectTour }) {
  // defining a coponent that takes in 2 props of the following:
  // obj is the information that is associated with the date the users picks when editing a date onSelectTour is calling the onSelectTour function once a user selects a tour
  const [formInput, setFormInput] = useState(initialState);
  // useState that will handle the form input from the user its initial state is initialState which sets the id and name to an empty string
  const [tours, setTours] = useState([]);
  // useState that sets the initial state of tours to an empty array to be able to store the Api call that gets the tour names
  const { user } = useAuth();
  // getting user information that is in the useAuth hook

  useEffect(() => {
    // a hook that updates when the component mounts or obj or user change
    getTours(user).then(setTours);
    // calling getTours and passing in user from the useAuth hook as an arugment
    // setting the state of tours to the array of returned info one data is fetched
    if (obj) setFormInput(obj);
    // if statement checking that if obj is not null it will change the state of formInput to update with obj's values
  }, [obj, user]);
  // runs whenever the obj or user info changes

  const handleChange = (e) => {
    // this defines a function that will handle when the user changes the input of the form and takes in an an object called e or event
    const { name, value } = e.target;
    // getting the name of which input field is being changed and the value that the user selects which will be a firebasekey
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // changes state by only changing the name value that the user selects and keep the rest of the info of the form

    if (value) {
      // if the selected tour has a tour id this happens:
      getDatesByTourId(user.uid, value).then(onSelectTour)
        .catch((err) => console.error('Error getting dates by tour ID:', err));
      // this is calling the getDatesByTourId promise that is fetching the returned info from the api call.
      // it is passing in the user id and the value that the user selected (firbaseKey from tours) and returning the info fetched from this call.
    }
  };

  return (
    <Form>
      <div>
        <FloatingLabel controlId="floatingSelect" label="Tours">
          <Form.Select
            aria-label="Tours"
            name="id"
            onChange={handleChange}
            // attatching the handleChange function the when change happens to this input
            className="mb-3"
            value={formInput.id}
            // making sure that the current selection displays the id state of fromInput
            required
          >
            <option value="">Select a Tour</option>
            {/* setting the default value of option selected to an empty string */}
            {tours.map((tour) => (
              // maps through the tour array to return and display all of the tours in our database
              <option key={tour.firebaseKey} value={tour.firebaseKey}>
                {tour.name}
                {/* display the name and setting value to each tour returned from the tour array */}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </div>
    </Form>
  );
}

TourPickerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onSelectTour: PropTypes.func.isRequired,
};

TourPickerForm.defaultProps = {
  obj: initialState,
};

export default TourPickerForm;
