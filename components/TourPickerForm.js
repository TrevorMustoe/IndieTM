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

  const handleChange = (tourId) => {
    setFormInput((prevState) => ({
      ...prevState,
      id: tourId, // Update the selected tour ID
    }));

    // Fetch tour dates based on the selected tour ID and pass to parent component
    if (tourId) {
      getDatesByTourId(user.uid, tourId)
        .then(onSelectTour) // This will pass the dates to the parent component
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
      <FloatingLabel controlId="floatingSelect" label="Tours">
        {tours.map((tour) => (
          <Button
            key={tour.firebaseKey}
            aria-label="Tours"
            onClick={() => handleChange(tour.firebaseKey)} // Pass tour's firebaseKey to handleChange
            className="mb-3"
          >
            {tour.name}
          </Button>
        ))}
      </FloatingLabel>

      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Link href="/showFullTour">
              <div className="sm">
                <Button
                  style={{
                    color: 'black', backgroundColor: 'white', border: '0px', fontSize: '15px',
                  }}
                >
                  Add New Tour
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
