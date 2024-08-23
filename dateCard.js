import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteDates } from './api/datesData';

function DateCard({ dateObj, onUpdate }) {
  const deleteThisDate = () => {
    if (window.confirm(`Delete ${dateObj.date}?`)) {
      deleteDates(dateObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card className="bg-dark text-white" style={{ border: 'white solid 2px', borderRadius: '10px', width: '400px' }}>
      <Card.Header
        as="h5"
        style={{
          color: 'white', paddingTop: '20px', paddingBottom: '20px', fontWeight: '100',
        }}
      >Date: {dateObj.date}
      </Card.Header>
      <Card.Body>
        <Card.Title>Venue: {dateObj.venueName}</Card.Title>
        <Card.Title style={{ color: 'white', fontWeight: '100' }}>Brooklyn, New York</Card.Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <Button variant="success">View Show Details</Button>
          <Button onClick={deleteThisDate} variant="danger">Delete Show</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

DateCard.propTypes = {
  dateObj: PropTypes.shape({
    city: PropTypes.string,
    venueName: PropTypes.string,
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DateCard;
