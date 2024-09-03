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

function TourPickerForm({ obj, onSelectTour }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tours, setTours] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getTours(user).then(setTours);
    if (obj) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value) {
      getDatesByTourId(user.uid, value).then(onSelectTour)
        .catch((err) => console.error('Error fetching dates by tour ID:', err));
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
            className="mb-3"
            value={formInput.id}
            required
          >
            <option value="">Select a Tour</option>
            {tours.map((tour) => (
              <option key={tour.firebaseKey} value={tour.firebaseKey}>
                {tour.name}
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
