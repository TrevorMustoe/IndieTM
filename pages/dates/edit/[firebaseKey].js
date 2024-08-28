import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleDate } from '../../../api/datesData';
import AddShowForm from '../../../components/addShowForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleDate(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
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
      <AddShowForm obj={editItem} />
    </div>
  );
}
