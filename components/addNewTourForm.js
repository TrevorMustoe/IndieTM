import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getDatesByTourId } from '../api/datesData';

const initialState = {
  id: '',
  name: '',
};
// setting id and name to an empty sting to be able to store the tour name and id when user selects.

function AddNewTourForm({ onSelectTour }) {
  // defining a coponent that takes in 2 props of the following:
  // obj is the information that is associated with the date the users picks when editing a date onSelectTour is calling the onSelectTour function once a user selects a tour
  const [formInput, setFormInput] = useState(initialState);
  // useState that will handle the form input from the user its initial state is initialState which sets the id and name to an empty string
  const { user } = useAuth();
  // getting user information that is in the useAuth hook

  useEffect(() => {
  });
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
        <label htmlFor="date">Add New Tour</label>
        <input
          type="text"
          placeholder="Tour Name"
          name="tourName"
          value={formInput.date}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '16px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: 'solid white 2px',
          }}
        />
        <Button
          style={{
            margin: '10px', width: '40%', backgroundColor: 'var(--accent-color-1)', color: 'var(--button-color)', border: 'Solid 0px black',
          }}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

AddNewTourForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onSelectTour: PropTypes.func.isRequired,
};

AddNewTourForm.defaultProps = {
  obj: initialState,
};

export default AddNewTourForm;
