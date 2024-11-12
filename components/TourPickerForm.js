import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import {
  FloatingLabel, Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createTour, getTours, updateTour } from '../api/tourData';
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

    if (name === 'id' && value) {
      getDatesByTourId(user.uid, value).then(onSelectTour)
        .catch((err) => console.error('Error getting dates by tour ID:', err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, uid: user.uid };
    createTour(payload).then((newTour) => {
      const firebaseKey = newTour.name;
      const patchPayload = { ...payload, firebaseKey };

      updateTour(patchPayload).then(() => {
        getTours(user).then(setTours);
        setFormInput(initialState);
      });
    });
  };

  return (
    <Container fluid className="p-3">
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <FloatingLabel controlId="floatingSelect" label="Tours">
              <Form.Select
                aria-label="Tours"
                name="id"
                onChange={handleChange}
                className="mb-3"
                value={formInput.id}
              >
                <option value="">Select a Tour</option>
                {tours.map((tour) => (
                  <option key={tour.firebaseKey} value={tour.firebaseKey}>
                    {tour.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="text-center mb-3">
          <Col>
            <h5>Or</h5>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <label htmlFor="date" className="form-label">Start a new tour:</label>
            <input
              type="text"
              placeholder="Enter Tour Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              className="form-control mb-3"
              style={{
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: 'white',
                borderRadius: '10px',
              }}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              variant="light"
              size="sm"
              type="submit"
              className="mb-2"
              disabled={!formInput.name.trim()} // Disable button if name is empty
            >
              {obj.firebaseKey ? 'Save Changes' : 'Save New Tour Name'}
            </Button>
          </Col>
          <Col xs="auto">
            <Link href="/showForm" passHref>
              <Button variant="light" size="sm" className="mb-2">
                Add A New Show
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
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
