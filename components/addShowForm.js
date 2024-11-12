import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
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

// setting ititial state of each of these from inputs to empty strings

// TM TODO: Create initial state that takes in new tour names
// TM TODO: Set up the hand change and handle submit to take in the new tour name
// TM TODO: Set up a version of handleSubmit only for tour submissions and reset the form the be able to add more.
// TM TODO: Add in option on tour picker form that will handle a modal and add in new tour name

function AddShowForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // This will be here to check if the modal button was clicked in the options
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

  // This is where I can add a tourSubmit logic to only activate when clicking submit on new tour.
  // maybe make it a modulus or whatever it is called when the littl box pops up.

  return (
    <div style={{ margin: '20px', color: 'var(--accent-color-1)' }}>
      <Form onSubmit={handleSubmit}>
        <div className="updateCreate">
          <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{obj.firebaseKey ? 'Edit' : 'Create New'} Show Date</h2>
        </div>
        <div
          style={{
            display: 'flex', flexDirection: 'row', alignItems: 'flex-end',
          }}
          className="noNotes"
        >
          <div>

            <div className="tourAndDate">
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
                >
                  <option value="">Select a Tour</option>
                  {tours.map((tour) => (
                    <option key={tour.firebaseKey} value={tour.firebaseKey}>
                      {tour.name}
                    </option>
                  ))}
                  <option value="">New Tour Name</option>
                  {/* Set this so change state to allow modal to pop up, then add new tour to modal, set state of new tours and clear form */}
                </Form.Select>
              </FloatingLabel>
            </div>
            <div className="tourAndDate">
              <div style={{
                flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
              }}
              >
                <label htmlFor="date">Enter Date:</label>
                <input
                  type="date"
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
                    borderRadius: '10px',
                    border: 'solid white 2px',
                  }}
                />

              </div>
            </div>
            <div className="times">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{
                  flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
                }}
                >
                  <label htmlFor="loadinTime">Load In:</label>
                  <input
                    type="time"
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
                    type="time"
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
                    type="time"
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
                    type="time"
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
                  type="time"
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
                    borderRadius: '10px',
                    border: 'solid white 2px',
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="locations">
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
                    borderRadius: '10px',
                    border: 'solid white 2px',
                  }}
                />

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
                    borderRadius: '10px',
                    border: 'solid white 2px',
                  }}
                />
              </div>

              <div style={{
                flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '10px',
              }}
              >
                <label htmlFor="hospitalityAddy">Hotel Address</label>
                <input
                  type="text"
                  placeholder="Enter Hospitality Address"
                  name="hospitalityAddy"
                  value={formInput.hospitalityAddy}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    height: '40px',
                    paddingLeft: '16px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    border: 'solid white 2px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{
          backgroundColor: 'var(--accent-color-2)', color: 'var(--form-text)', padding: '30px', margin: '10px', borderRadius: '10px',
        }}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Show Notes</Form.Label>
            <Form.Control
              value={formInput.showNotes}
              onChange={handleChange}
              name="showNotes"
              as="textarea"
              placeholder="Show Notes"
              rows={3}
            />
          </Form.Group>
        </div>
        <Button
          style={{
            margin: '10px', width: '40%', backgroundColor: 'var(--accent-color-1)', color: 'var(--button-color)', border: 'Solid 0px black',
          }}
          type="submit"
        >
          {obj.firebaseKey ? 'Save Changes' : 'Save'}
        </Button>
        {obj.firebaseKey && (
          <Link href={`/dates/${obj.firebaseKey}`} passHref>
            <Button variant="danger" className="m-2">Go Back</Button>
          </Link>
        )}
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
    hospitalityAddy: PropTypes.string,
    venueName: PropTypes.string,
    loadinTime: PropTypes.string,
    setTime: PropTypes.string,
    soundCheck: PropTypes.string,
    loadoutTime: PropTypes.string,
    venueAddress: PropTypes.string,
    showNotes: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

AddShowForm.defaultProps = {
  obj: initialState,
};

export default AddShowForm;
