import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
        color: '#f8f9fa',
      }}
    >
      <div className="tourPickerBox" style={{ width: '100%', padding: '0 20px' }}>
        <label htmlFor="tour" style={{ color: '#ffcc00' }}>
          Please select a tour below:
        </label>
        <TourPickerForm onSelectTour={handleSelectTour} />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'start',
          marginLeft: '10px',
          marginRight: '10px',
          gap: '20px',
          width: '100%',
          padding: '0 20px',
        }}
      >
        {dates.map((dateObj) => (
          <DateCard key={dateObj.firebaseKey} dateObj={dateObj} />
        ))}
      </div>

      <hr
        className="lines"
        style={{
          marginTop: '40px',
          width: '90%',
          borderColor: '#ffcc00',
          borderWidth: '2px',
        }}
      />
      <Link href="/showForm" passHref>
        <Button
          style={{
            marginTop: '40px',
            backgroundColor: '#ffcc00',
            borderColor: '#ffcc00',
            color: '#333',
            width: '90%',
            maxWidth: '300px',
          }}
          variant="light"
          size="lg"
        >
          Add A New Show
        </Button>
      </Link>
    </div>
  );
}

export default ShowFullTour;
