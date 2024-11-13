import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Form, Button, Container, Row, Col, Modal,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createTour, getTours, updateTour } from '../api/tourData';
import { getDatesByTourId } from '../api/datesData';

const initialState = {
  id: '',
  name: '',
};

function AddTourForm({ obj, onSelectTour }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tours, setTours] = useState([]);
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        // Refresh the tour list after adding a new tour
        getTours(user).then((updatedTours) => {
          setTours(updatedTours);
          setFormInput(initialState);
          handleClose(); // Close the modal
        });
      });
    });
  };

  return (
    <Container fluid className="p-3">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} />
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button style={{ marginBottom: '10px' }} variant="light" onClick={handleShow}>
            Add New Tour Name
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <h2 style={{ textAlign: 'center' }}>All Tours</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col style={{
          display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-start', alignContent: 'space-between',
        }}
        >
          {tours.map((tour) => (
            <Button
              style={{
                marginTop: '10px', width: '300px', height: 'auto', padding: '30px 20px',
              }}
              variant="light"
              key={tour.firebaseKey}
              value={tour.firebaseKey}
            >
              {tour.name}
              <div style={{ display: 'flex' }}>
                <Button
                  size="sm"
                  style={{
                    textAlign: 'center', backgroundColor: '#273c4d', border: '0px', color: 'white',
                  }}
                  className="m-2"
                >Edit Tour Name
                </Button>
                <Button size="sm" className="m-2" style={{ border: '0px' }} variant="danger">Delete Show</Button>
              </div>
            </Button>
          ))}
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="date" className="form-label">Add A New Tour:</label>
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
            <Button
              variant="light"
              size="sm"
              type="submit"
              className="mb-2"
              disabled={!formInput.name.trim()}
            >
              {obj.firebaseKey ? 'Save Changes' : 'Save New Tour Name'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

AddTourForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onSelectTour: PropTypes.func.isRequired,
};

AddTourForm.defaultProps = {
  obj: initialState,
};

export default AddTourForm;
