import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useRouter } from 'next/router';
import {
  Form, Button, Container, Row, Col, Modal,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import {
  createTour, getTours, updateTour, getSingleTour, deleteTour,
} from '../api/tourData';
import { getDatesByTourId } from '../api/datesData';

const initialState = {
  id: '',
  name: '',
  firebaseKey: '',
};

function AddTourForm({ obj, onSelectTour }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tours, setTours] = useState([]);
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();

  // Delete tour handler
  const deleteThisTour = (tour) => {
    if (window.confirm(`Delete ${tour.name}?`)) {
      deleteTour(tour.firebaseKey).then(() => {
        setTours((prevTours) => prevTours.filter((t) => t.firebaseKey !== tour.firebaseKey));
      }).catch((err) => console.error('Error deleting tour:', err));
    }
  };

  const handleShowDates = (firebaseKey) => {
    if (firebaseKey) {
      getDatesByTourId(firebaseKey).then(() => {
        router.push(`/show-dates/${firebaseKey}`);
      }).catch((err) => console.error('Error fetching dates by tour ID:', err));
    }
  };

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

    if (formInput.firebaseKey) {
      updateTour(formInput).then(() => {
        getTours(user).then((updatedTours) => {
          setTours(updatedTours);
          setFormInput(initialState);
          handleClose();
        });
      }).catch((err) => console.error('Error updating tour:', err));
    } else {
      createTour(payload).then((newTour) => {
        const firebaseKey = newTour.name;
        const patchPayload = { ...payload, firebaseKey };

        updateTour(patchPayload).then(() => {
          getTours(user).then((updatedTours) => {
            setTours(updatedTours);
            setFormInput(initialState);
            handleClose();
          });
        }).catch((err) => console.error('Error creating tour:', err));
      });
    }
  };

  const handleEditClick = (firebaseKey) => {
    getSingleTour(firebaseKey).then((tourData) => {
      setFormInput({
        id: tourData.id,
        name: tourData.name,
        firebaseKey: tourData.firebaseKey,
      });
      handleShow();
    }).catch((err) => console.error('Error fetching tour by ID:', err));
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
            <div key={tour.firebaseKey}>
              <Button
                style={{
                  marginTop: '10px', width: '300px', height: 'auto', padding: '30px 20px',
                }}
                variant="light"
                value={tour.firebaseKey}
                onClick={() => handleShowDates(tour.firebaseKey)}
              >
                {tour.name}
              </Button>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button
                  className="m-2"
                  size="sm"
                  variant="dark"
                  value={tour.name}
                  onClick={() => handleEditClick(tour.firebaseKey)}
                >
                  Edit Tour Name
                </Button>
                <Button size="sm" onClick={() => deleteThisTour(tour)} className="m-2" style={{ border: '0px' }} variant="danger">Delete Tour</Button>
              </div>
            </div>
          ))}

        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formInput.firebaseKey ? 'Edit Tour' : 'Add New Tour'}</Modal.Title>
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
            <div>
              <Button
                variant="light"
                size="sm"
                type="submit"
                className="mb-2"
                disabled={!formInput.name.trim()}
              >
                {formInput.firebaseKey ? 'Save Changes' : 'Save New Tour Name'}
              </Button>
            </div>
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
    id: PropTypes.string,
  }),
  onSelectTour: PropTypes.func,
};

AddTourForm.defaultProps = {
  obj: initialState,
  onSelectTour: () => {},
};

export default AddTourForm;
