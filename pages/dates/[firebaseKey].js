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
      marginTop: '20px',
      marginBottom: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <div style={{
        marginTop: '20px',
        marginBottom: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <h1 style={{ color: 'white' }}>SHOW INFO</h1>
      </div>
      <div style={{
        marginTop: '20px',
        marginBottom: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'solid lightgrey 4px',
        padding: '20px',
      }}
      >
        <h1 style={{ color: 'white' }}>Venue</h1>
        <hr style={{
          width: '50%',
          border: '1px solid white',
          marginTop: '10px',
          marginBottom: '20px',
        }}
        />
        <h3 style={{ color: 'white' }}>{dateDetails.venueName}</h3>
        <p style={{ color: 'white' }}>{dateDetails.venueAddress}</p>
        <hr style={{
          width: '100%',
          border: '2px solid white',
          marginTop: '10px',
          marginBottom: '20px',
        }}
        />
        <h1 style={{ color: 'white' }}>Hospitality</h1>
        <hr style={{
          width: '50%',
          border: '1px solid white',
          marginTop: '10px',
          marginBottom: '20px',
        }}
        />
        <h3 style={{ color: 'lightgrey' }}>{dateDetails.hospitalityName}</h3>
        <hr style={{
          width: '100%',
          border: '2px solid white',
          marginTop: '10px',
          marginBottom: '20px',
        }}
        />
        <h3 style={{ color: 'white' }}>Run Of Show</h3>
        <div style={{
          marginTop: '5px',
          width: '50%',
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
        <Link href={`/dates/edit/${dateDetails.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">Edit</Button>
        </Link>
      </div>
    </div>
  );
}
