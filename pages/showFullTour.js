import React, { useState } from 'react';
import DateCard from '../components/dateCard';
import TourPickerForm from '../components/TourPickerForm';

function ShowFullTour() {
  const [dates, setDates] = useState([]);

  const handleSelectTour = (tourDates) => {
    const sortedDates = tourDates.sort((a, b) => new Date(a.date) - new Date(b.date));
    setDates(sortedDates);
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
        alignContent: 'stretch',
      }}
    >
      <div className="tourPickerBox">
        <label htmlFor="tour">Please select a tour below:</label>
        <TourPickerForm onSelectTour={handleSelectTour} />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'start',
          marginLeft: '45px',
          marginRight: '30px',
          gap: '20px',
        }}
      >
        {dates.map((dateObj) => (
          <DateCard key={dateObj.firebaseKey} dateObj={dateObj} />
        ))}
      </div>
      <hr className="lines" style={{ marginTop: '40px' }} />
    </div>
  );
}

export default ShowFullTour;
