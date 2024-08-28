import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { getTours } from '../api/tourData';
import { updateDate, createDate } from '../api/datesData';

// TODO Change the intial states below
const initialState = {
  tourID: '',
  date: '',
  state: '',
  city: '',
  doorTime: '',
  hospitalityName: '',
  venueName: '',
  loadinTime: '',
  setTime: '',
  soundCheck: '',
  loadoutTime: '',
  venueAddress: '',
  firebaseKey: '',
  uid: '',
};

function AddShowForm({ obj }) {
  // this sets the inital state using the blank varaiables
  const [formInput, setFormInput] = useState(initialState);
  // These are called state variables
  const [tours, setTours] = useState([]);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    getTours(user.uid).then(setTours);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  // this handles the changes to the book form
  const handleChange = (e) => {
    // this is grabbing from the title input keys
    const { name, value } = e.target;
    // this is called to change state. previous state is what the previous state is called
    setFormInput((prevState) => ({
      // this spreads an object out
      ...prevState,
      // this gives the value of what ever the user inputs
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
        updateDate(patchPayload).then(() => {
          router.push('/showFullTour');
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Tour</h2>
      <div>
        <FloatingLabel
          controlId="floatingSelect"
          label="Tours"
        >
          <Form.Select
            aria-label="Toursssss"
            name="tourID"
            onChange={handleChange}
            className="mb-3"
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
      </div>
      <div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
        }}
        >
          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
          }}
          >
            <label htmlFor="date">Enter Date:</label>
            <input
              type="text"
              placeholder="Enter Date"
              name="date"
              value={formInput.date}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
            />

          </div>

          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
          }}
          >
            <label htmlFor="state">Enter State:</label>
            <input
              type="text"
              placeholder="Enter State"
              name="state"
              value={formInput.state}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
            />

          </div>
        </div>

        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
        }}
        >
          <label htmlFor="city">City Name:</label>
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            value={formInput.city}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
          />

        </div>

        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
        }}
        >

          <label htmlFor="venueName">Venue Name:</label>
          <input
            type="text"
            placeholder="Enter Venue Name"
            name="venueName"
            value={formInput.venueName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
          />

        </div>

        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
        }}
        >

          <label htmlFor="venueAddress">Venue Address:</label>
          <input
            type="text"
            placeholder="Enter Venue Address"
            name="venueAddress"
            value={formInput.venueAddress}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
          />

        </div>
        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
        }}
        >
          <label htmlFor="hospitalityName">Hotel Name:</label>
          <input
            type="text"
            placeholder="Enter Hospitality Name"
            name="hospitalityName"
            value={formInput.hospitalityName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
          />

        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
          }}
          >
            <label htmlFor="loadinTime">Load In:</label>
            <input
              type="text"
              placeholder="Load In"
              name="loadinTime"
              value={formInput.loadinTime}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
            />

          </div>

          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
          }}
          >
            <label htmlFor="soundCheck">Sound Check:</label>
            <input
              type="text"
              placeholder="Sound Check"
              name="soundCheck"
              value={formInput.soundCheck}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
            />

          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
          }}
          >
            <label htmlFor="doorTime">Door Time:</label>
            <input
              type="text"
              placeholder="Door Time"
              name="doorTime"
              value={formInput.doorTime}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
            />

          </div>

          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
          }}
          >
            <label htmlFor="setTime">Enter Set Time:</label>
            <input
              type="text"
              placeholder="Set Time"
              name="setTime"
              value={formInput.setTime}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
            />

          </div>
        </div>

        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
        }}
        >
          <label htmlFor="loudoutTime">Enter Set Time:</label>
          <input
            type="text"
            placeholder="Load Out"
            name="loadoutTime"
            value={formInput.loadoutTime}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
          />
        </div>

        <Button style={{ margin: '10px', width: '40%' }} variant="success" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

AddShowForm.propTypes = {
  obj: PropTypes.shape({
    tourID: PropTypes.string,
    date: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    doorTime: PropTypes.string,
    hospitalityName: PropTypes.string,
    venueName: PropTypes.string,
    loadinTime: PropTypes.string,
    setTime: PropTypes.string,
    soundCheck: PropTypes.string,
    loadoutTime: PropTypes.string,
    venueAddress: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

AddShowForm.defaultProps = {
  obj: initialState,
};

export default AddShowForm;
