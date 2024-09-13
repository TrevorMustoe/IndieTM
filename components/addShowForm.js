import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getTours } from '../api/tourData';
import { updateDate, createDate } from '../api/datesData';

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
};
// setting ititial state of each of these from inputs to empty strings

function AddShowForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // using useState to set the formInput state to initaial state from above
  const [tours, setTours] = useState([]);
  // setting tour state to an empty array to be able to store and change the tour state
  const router = useRouter();
  // setting router to useRouter that will allow us to navigate to different pages when called

  const { user } = useAuth();
  // getting the userInfo and setting it to an object called user

  useEffect(() => {
    getTours(user.uid).then(setTours);
    // gets all tour from getTours Api call and passes in user.uid to make sure its only getting the individual user's info
    // then it sets the state of tours with the return data from the api call

    if (obj.firebaseKey) setFormInput(obj);
    // chekcks if there is a obj being passed with a firebaseKey and sets the formInput to pass in the obj.
  }, [obj, user]);
  // makes sure to update when obj or user are changed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // setting the state of formInput to get the info the user inputs as well as keep the previous info the user inputs
  // more notes on this in tour picker form

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // checks if the obj has a firebasekey assosiated.
      updateDate(formInput).then(() => router.push(`/dates/${obj.firebaseKey}`));
      // calls the updateDate function using the form input and then routes the last dates diplayed
    } else {
      const payload = { ...formInput, uid: user.uid };
      createDate(payload).then(({ name }) => {
        // this creates a new date then gets the firebaseKey
        const patchPayload = { firebaseKey: name };
        updateDate(patchPayload).then(() => {
          // this is to update the new date with a firebasekey
          router.push('/showFullTour');
          // routes to full tour
        });
      });
    }
  };
  return (
    <div style={{ margin: '50px' }}>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create New'} Date</h2>
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
        <div style={{ color: 'black' }}>
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
                  backgroundColor: 'white',
                  color: 'black',
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
                  backgroundColor: 'white',
                  color: 'black',
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
              className="forminputs"
              required
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: 'white',
                color: 'black',
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
                backgroundColor: 'white',
                color: 'black',
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
                backgroundColor: 'white',
                color: 'black',
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
                backgroundColor: 'white',
                color: 'black',
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
                  backgroundColor: 'white',
                  color: 'black',
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
                  backgroundColor: 'white',
                  color: 'black',
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
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '10px',
                  border: 'solid white 2px',
                }}
              />

            </div>

            <div style={{
              flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
            }}
            >
              <label htmlFor="setTime">Set Time:</label>
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
                  backgroundColor: 'white',
                  color: 'black',
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
            <label htmlFor="loudoutTime">Load Out Time:</label>
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
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
            />
          </div>
          <Button
            style={{
              margin: '10px', width: '40%', backgroundColor: '#212529', border: 'Solid 0px black',
            }}
            type="submit"
          >
            Submit
          </Button>
          {obj.firebaseKey && (
          <Link href={`/dates/${obj.firebaseKey}`} passHref>
            <Button variant="danger" className="m-2">Go Back</Button>
          </Link>
          )}
        </div>
      </Form>
    </div>
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
