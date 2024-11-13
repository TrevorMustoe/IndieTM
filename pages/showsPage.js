import React, { useState } from 'react';
import DateCard from '../components/dateCard';
import TourPickerForm from '../components/TourPickerForm';

function ShowsPage() {
  const [dates, setDates] = useState([]);

  const handleSelectTour = (tourDates) => {
    const sortedDates = tourDates.sort((a, b) => new Date(a.date) - new Date(b.date));
    setDates(sortedDates);
  };

  return (
    <div
      className="mainPickBox"
    >
      <div className="tourPickerBox">
        <label htmlFor="tour">Please select a tour below:</label>
        <TourPickerForm onSelectTour={handleSelectTour} />
      </div>
      <div
        className="datesCards"
      >
        {dates.map((dateObj) => (
          <DateCard key={dateObj.firebaseKey} dateObj={dateObj} />
        ))}
      </div>
    </div>
  );
}

export default ShowsPage;
