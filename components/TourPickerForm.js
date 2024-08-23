import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTours } from '../api/tourData';

const initialState = {
  id: 0,
  name: 0,
};

// eslint-disable-next-line react/prop-types
function TourPickerForm({ obj, setValue }) {
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
    setValue(value);
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
            // key={formInput.id}
            value={formInput.id}
            required
          >
            <option value="">Select a Tour</option>
            {
    tours.map((tourName) => (
      <option
        key={tourName.id}
        value={tourName.id}
      >
        {tourName.name}
      </option>
    ))
  }
          </Form.Select>
        </FloatingLabel>
      </div>
    </Form>
  );
}

TourPickerForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.number,
  }),
};

TourPickerForm.defaultProps = {
  obj: initialState,
};

export default TourPickerForm;
