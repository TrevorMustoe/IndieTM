import AddShowForm from '../components/addShowForm';
import TourPickerForm from '../components/TourPickerForm';

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
      <h1 style={{ color: 'white' }}>SHOW FORM</h1>
      <TourPickerForm />
      <AddShowForm />
    </div>

  );
}

export default ShowForm;
