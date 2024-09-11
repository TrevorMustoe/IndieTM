import React, { useState } from 'react';
import DateCard from '../components/dateCard';
import TourPickerForm from '../components/TourPickerForm';

function ShowFullTour() {
  const [dates, setDates] = useState([]);

  const handleSelectTour = (tourDates) => {
    setDates(tourDates);
  };

  return (
    <div
      style={{
        marginTop: '15vh',
        marginBottom: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h5 style={{ color: '#212529', marginBottom: '20px' }}>Please select a tour below:</h5>
      <TourPickerForm onSelectTour={handleSelectTour} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          marginLeft: '45px',
          marginRight: '30px',
          gap: '20px',
        }}
      >
        {dates.map((dateObj) => (
          <DateCard key={dateObj.firebaseKey} dateObj={dateObj} />
        ))}
      </div>
    </div>
  );
}

export default ShowFullTour;
