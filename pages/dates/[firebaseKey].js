/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { getSingleDate } from '../../api/datesData';

export default function ViewDate() {
  const [dateDetails, setDateDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleDate(firebaseKey).then(setDateDetails);
  }, [firebaseKey]);

  return (
    <div style={{
      marginBottom: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <div style={{
        marginTop: '110px',
        marginBottom: '0px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>{dateDetails.date}, {dateDetails.city}</h1>
        <h2 style={{ fontWeight: 'bold', color: 'black' }}>{dateDetails.city}, {dateDetails.state}</h2>
      </div>
      <div style={{
        marginTop: '10px',
        marginBottom: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
      >
        <div className="venueHospWrap">
          <div className="venueWrap">
            <h1 style={{ color: 'black' }}>Venue</h1>
            <h3 style={{ color: 'black' }}>{dateDetails.venueName}</h3>
            <p style={{ color: 'black' }}>{dateDetails.venueAddress}</p>
          </div>
          <div className="hospWrap">
            <h1 style={{ color: 'black' }}>Hospitality</h1>
            <h3 style={{ color: 'black' }}>{dateDetails.hospitalityName}</h3>
          </div>
        </div>

        <h3 style={{ color: 'black' }}>Run Of Show</h3>
        <div style={{
          marginTop: '5px',
          width: '50%',
          marginBottom: '0px',
        }}
        >
          <Table bordered size="sm" variant="dark">
            <tbody>
              <tr>
                <td>Load In:</td>
                <td>{dateDetails.loadinTime}</td>
              </tr>
              <tr>
                <td>Sound Check:</td>
                <td>{dateDetails.soundCheck}</td>
              </tr>
              <tr>
                <td>Doors:</td>
                <td>{dateDetails.doorTime}</td>
              </tr>
              <tr>
                <td>Set Time:</td>
                <td>{dateDetails.setTime}</td>
              </tr>
              <tr>
                <td>Load Out Time:</td>
                <td>{dateDetails.loadoutTime}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
      }}
      >
        <Link href={`/dates/edit/${dateDetails.firebaseKey}`} passHref>
          <Button
            style={{
              marginRight: '10px', marginLeft: '10px', paddingLeft: '50px', paddingRight: '50px',
            }}
            variant="success"
          >Edit
          </Button>
        </Link>
        <Link href="/showFullTour" passHref>
          <Button
            style={{
              marginRight: '10px', marginLeft: '10px', paddingLeft: '50px', paddingRight: '50px',
            }}
            variant="danger"
          >Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
