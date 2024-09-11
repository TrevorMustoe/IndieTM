import AddShowForm from '../components/addShowForm';

function ShowForm() {
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
      <AddShowForm />
    </div>

  );
}

export default ShowForm;
