import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import {
  FloatingLabel, Form, Container, Row, Col, Button,
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
            <Link href="/showFullTour">
              <div className="sm">
                <Button
                  style={{
                    color: 'black', backgroundColor: 'white', border: '0px', fontSize: '15px',
                  }}
                  href="/showFullTour"
                >Add New Tour
                </Button>
              </div>
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
