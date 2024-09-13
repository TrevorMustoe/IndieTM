import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deleteDates } from '../api/datesData';

function DateCard({ dateObj }) {
  const router = useRouter();
  const deleteThisDate = () => {
    if (window.confirm(`Delete ${dateObj.date}?`)) {
      deleteDates(dateObj.firebaseKey).then(() => {
        router.push('/showFullTour');
      });
    }
  };
  return (
    <Card
      className="text-white"
      style={{
        background: '#273c4d', borderRadius: '10px', width: '250px',
      }}
    >
      <Card.Header
        as="h5"
        style={{
          color: 'white', paddingTop: '20px', paddingBottom: '20px', fontWeight: '100',
        }}
      >{dateObj.date}
      </Card.Header>
      <Card.Body className="cardBody">
        <Card.Title>{dateObj.venueName}</Card.Title>
        <Card.Title style={{ color: 'white', fontWeight: '100' }}>{dateObj.city}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <div style={{ justifyContent: 'space-between', marginTop: '30px' }}>
          <Link href={`/dates/${dateObj.firebaseKey}`} passHref>
            <Button
              size="sm"
              style={{
                textAlign: 'center', backgroundColor: 'white', border: '0px', color: '#212529',
              }}
              className="m-2"
            >View More
            </Button>
          </Link>
          <Button size="sm" onClick={deleteThisDate} className="m-2" style={{ border: '0px' }} variant="danger">Delete Show</Button>
        </div>
      </Card.Footer>
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
};

export default DateCard;
