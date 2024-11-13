import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, Col, Row, Container,
} from 'react-bootstrap';
import { createDate, updateDate } from '../api/datesData';
import { getTours } from '../api/tourData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  tourID: '',
  date: '',
  state: '',
  city: '',
  doorTime: '',
  hospitalityName: '',
  hospitalityAddy: '',
  venueName: '',
  loadinTime: '',
  setTime: '',
  soundCheck: '',
  loadoutTime: '',
  venueAddress: '',
  showNotes: '',
};

function AddShowForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tours, setTours] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTours(user.uid).then(setTours);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateDate(formInput).then(() => router.push(`/dates/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createDate(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateDate(patchPayload).then(() => router.push('/showFullTour'));
      });
    }
  };

  return (
    <Container
      style={{
        marginBottom: '100px',
        color: 'var(--accent-color-1)',
        backgroundColor: '#273c4d',
        padding: '20px',
        borderRadius: '5px',
      }}
      className="add-show-form"
    >
      <Form onSubmit={handleSubmit}>
        <h2 style={{ color: 'white' }} className="text-center mb-4">{obj.firebaseKey ? 'Edit' : 'Add New'} Show</h2>

        <Row className="mb-3">
          <Col xs={12}>
            <FloatingLabel controlId="floatingSelect" label="Select Tour">

              <Form.Select
                aria-label="Select Tour"
                name="tourID"
                onChange={handleChange}
                value={formInput.tourID}
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
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <FloatingLabel controlId="floatingDate" label="Date">
              <Form.Control
                type="date"
                name="date"
                value={formInput.date}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6}>
            <FloatingLabel label="State">
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={formInput.state}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
          <Col xs={6}>
            <FloatingLabel label="City">
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={formInput.city}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6}>
            <FloatingLabel style={{ zIndex: '0' }} label="Load In Time">
              <Form.Control
                type="time"
                name="loadinTime"
                value={formInput.loadinTime}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
          <Col xs={6}>
            <FloatingLabel style={{ zIndex: '0' }} label="Sound Check Time">
              <Form.Control
                type="time"
                name="soundCheck"
                value={formInput.soundCheck}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6}>
            <FloatingLabel style={{ zIndex: '0' }} label="Door Time">
              <Form.Control
                type="time"
                name="doorTime"
                value={formInput.doorTime}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
          <Col xs={6}>
            <FloatingLabel style={{ zIndex: '0' }} label="Set Time">
              <Form.Control
                type="time"
                name="setTime"
                value={formInput.setTime}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <FloatingLabel style={{ zIndex: '0' }} label="Venue Name">
              <Form.Control
                type="text"
                placeholder="Venue Name"
                name="venueName"
                value={formInput.venueName}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <FloatingLabel style={{ zIndex: '0' }} label="Venue Address">
              <Form.Control
                type="text"
                placeholder="Venue Address"
                name="venueAddress"
                value={formInput.venueAddress}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <FloatingLabel style={{ zIndex: '0' }} label="Hospitality Name">
              <Form.Control
                type="text"
                placeholder="Hospitality Name"
                name="hospitalityName"
                value={formInput.hospitalityName}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <FloatingLabel style={{ zIndex: '0' }} label="Show Notes">
              <Form.Control
                as="textarea"
                placeholder="Add notes for this show"
                name="showNotes"
                value={formInput.showNotes}
                onChange={handleChange}
                rows={3}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Button variant="light" type="submit" className="w-100">
          {obj.firebaseKey ? 'Save Changes' : 'Save New Show'}
        </Button>
      </Form>
    </Container>
  );
}

AddShowForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    tourID: PropTypes.string,
    date: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    doorTime: PropTypes.string,
    hospitalityName: PropTypes.string,
    hospitalityAddy: PropTypes.string,
    venueName: PropTypes.string,
    loadinTime: PropTypes.string,
    setTime: PropTypes.string,
    soundCheck: PropTypes.string,
    loadoutTime: PropTypes.string,
    venueAddress: PropTypes.string,
    showNotes: PropTypes.string,
  }),
};

AddShowForm.defaultProps = {
  obj: initialState,
};

export default AddShowForm;
