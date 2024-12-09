import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getDatesByTourId } from '../../api/datesData';
import DateCard from '../../components/dateCard';

function ShowDatesPage() {
  const router = useRouter();
  const { firebaseKey } = router.query; // Access the firebaseKey from the URL
  const [dates, setDates] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (firebaseKey && user?.uid) {
      console.log('firebaseKey:', firebaseKey, 'userUID:', user.uid);
      getDatesByTourId(user.uid, firebaseKey)
        .then((fetchedDates) => {
          console.log('Fetched dates:', fetchedDates);
          if (fetchedDates) {
            const datesArray = Array.isArray(fetchedDates)
              ? fetchedDates
              : Object.values(fetchedDates);
            console.log('Dates array:', datesArray);
            setDates(datesArray);
          } else {
            console.log('No dates found for this tour');
          }
        })
        .catch((err) => console.error('Error fetching dates:', err));
    }
  }, [firebaseKey, user?.uid]); // Make sure to include user.uid as a dependency

  return (
    <div>
      <div>
        <h1>Tour Dates</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {dates.map((date) => (
            <DateCard key={date.firebaseKey} dateObj={date} />
          ))}
        </div>
      </div>
      <div className="buttons">
        <Button href="/showFullTour" passHref variant="danger" className="back-button">
          Back
        </Button>
      </div>
    </div>
  );
}

export default ShowDatesPage;
