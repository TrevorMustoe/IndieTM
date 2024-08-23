import { useState, useEffect, React } from 'react';
import { useAuth } from '../utils/context/authContext';
import DateCard from '../dateCard';
import { getAllDates } from '../api/datesData';
import TourPickerForm from '../components/TourPickerForm';

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
      <TourPickerForm />
      <h2 style={{ color: 'white', marginBottom: '20px', fontWeight: '100' }}>No Tour Selected</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'start',
          gap: '20px',
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
