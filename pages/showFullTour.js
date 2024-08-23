import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../utils/context/authContext';
import DateCard from '../dateCard';
import { getAllDates } from '../api/datesData';

function ShowFullTour() {
  const [dates, setDates] = useState([]);

  const { user } = useAuth();

  // Use useCallback to make getAllTheTourDates stable
  const getAllTheTourDates = () => {
    getAllDates(user.uid).then(setDates);
  };

  // Fetch the tour dates on component mount and when user changes
  useEffect(() => {
    getAllTheTourDates();
  }, []);
  return (
    <div
      style={{
        marginTop: '70px',
        marginBottom: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h5 style={{ color: 'white', marginBottom: '20px' }}>Please select a tour below:</h5>
      <Dropdown
        style={{ marginBottom: '60px', border: 'white solid 1px', borderRadius: '7.5px' }}
      >
        <Dropdown.Toggle style={{ backgroundColor: '#252626' }} variant="secondary" id="dropdown-basic">
          Select A Tour!
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Tour 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Tour 2</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Tour 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h2 style={{ color: 'white', marginBottom: '20px', fontWeight: '100' }}>No Tour Selected</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'start',
          gap: '10px',
        }}
      >
        {dates.map((tourDates) => (
          <DateCard key={tourDates.firebaseKey} dateObj={tourDates} onUpdate={getAllTheTourDates} />
        ))}
      </div>
    </div>
  );
}

export default ShowFullTour;
