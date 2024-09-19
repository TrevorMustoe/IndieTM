/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
      marginBottom: '20px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <div style={{
        marginTop: '100px',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#212529',
        borderRadius: '10px',
        padding: '10px',
      }}
      >
        <h2 style={{ color: 'white' }}>{dateDetails.date}</h2>
        <h4 style={{ color: 'white' }}>{dateDetails.city}, {dateDetails.state}</h4>
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
      }}
      >
        <div className="venueHospTimeWrap">
          <div className="venueHospWrap">
            <div className="venueWrap">
              <p style={{ color: 'white' }}>Venue</p>
              <h5 style={{ color: 'white' }}>{dateDetails.venueName}</h5>
              <hr style={{ color: 'white' }} />
              <p style={{ color: 'white' }}>{dateDetails.venueAddress}</p>
            </div>
            <div className="hospWrap">
              <p style={{ color: 'white' }}>Hospitality</p>
              <h5 style={{ color: 'white' }}>{dateDetails.hospitalityName}</h5>
              <hr style={{ color: 'white' }} />
              <p style={{ color: 'white' }}>{dateDetails.hospitalityAddy}</p>
            </div>
          </div>

          <div style={{
            marginTop: '5px',
            width: '40%',
          }}
          >
            <div className="table">
              <h5 style={{
                color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '5px',
              }}
              >Run Of Show
              </h5>
              <hr style={{ color: 'white' }} />
              <table>
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
              </table>
            </div>
          </div>
        </div>
        <div className="showNotes">
          <p>Notes</p>
          <hr style={{ color: 'var(--background-color)' }} />
          <p>{dateDetails.showNotes}</p>
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
      }}
      >
        <Link href="/showFullTour" passHref>
          <Button
            style={{
              marginRight: '10px', marginLeft: '10px', paddingLeft: '50px', paddingRight: '50px',
            }}
            variant="danger"
          >Back
          </Button>
        </Link>
        <Link href={`/dates/edit/${dateDetails.firebaseKey}`} passHref>
          <Button
            style={{
              marginRight: '10px', marginLeft: '10px', paddingLeft: '50px', paddingRight: '50px', backgroundColor: '#212529', border: 'solid 0px black',
            }}
          >Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
