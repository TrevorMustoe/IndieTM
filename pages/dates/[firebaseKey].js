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
    if (firebaseKey) {
      getSingleDate(firebaseKey).then(setDateDetails);
    }
  }, [firebaseKey]);

  return (
    <div className="view-date-container">
      <div className="header">
        <h2>{dateDetails.date}</h2>
        <h4>{dateDetails.city}, {dateDetails.state}</h4>
      </div>

      <div className="venue-hospitality-info">
        <div className="venue-info">
          <p>Venue</p>
          <h5>{dateDetails.venueName}</h5>
          <hr />
          <p>{dateDetails.venueAddress}</p>
        </div>

        <div className="hospitality-info">
          <p>Hospitality</p>
          <h5>{dateDetails.hospitalityName}</h5>
          <hr />
          <p>{dateDetails.hospitalityAddy}</p>
        </div>
      </div>

      <div className="run-of-show">
        <h5>Run Of Show</h5>
        <hr />
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

      <div className="notes">
        <p>Notes</p>
        <hr />
        <p>{dateDetails.showNotes}</p>
      </div>

      <div className="buttons">
        <Link href="/showFullTour" passHref>
          <Button variant="danger" className="back-button">
            Back
          </Button>
        </Link>
        <Link href={`/dates/edit/${dateDetails.firebaseKey}`} passHref>
          <Button className="edit-button">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
