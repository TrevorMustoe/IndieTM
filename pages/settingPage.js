import {
  Tabs, Tab,
} from 'react-bootstrap';
import UiOptions from '../components/userInterfaceOptions';
import { useAuth } from '../utils/context/authContext';

function SettingsPage() {
  const { user } = useAuth();
  return (
    <div style={{
      marginTop: '20%',
      marginBottom: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
    >
      <Tabs defaultActiveKey="tab1" id="settings-tabs" className="mb-3">
        <Tab eventKey="tab1" title="User Information">
          <h4 style={{ fontWeight: 'bold' }}>User Name:</h4>
          <div>{user.displayName}</div>
        </Tab>
        <Tab eventKey="tab2" title="Themes + Colors">
          <div><UiOptions /></div>
        </Tab>
      </Tabs>

      {/* <div style={{
        marginTop: '20%',
        marginBottom: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
      >
        <hr width="30%;" color="black" size="5" />
        <h5>Toggle Light Mode Or Dark Mode Here</h5>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
          <h5>☀️</h5>
          <Form.Switch onChange={darkModeToggle} />
          <h5>🌙</h5>
        </div>
        <hr width="30%;" color="black" size="5" />
        <h5>UI Color</h5>
        <div
          className="colorBox"
          style={{
            display: 'flex', justifyContent: 'center', width: '15%', gap: '10px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button style={{ width: '40px', backgroundColor: 'red', height: '20px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button style={{ width: '40px', backgroundColor: 'blue', height: '20px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button style={{ width: '40px', backgroundColor: 'green', height: '20px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button style={{ width: '40px', backgroundColor: 'pink', height: '20px' }} />
          </div>
        </div>
        <hr width="30%;" color="black" size="5" />
      </div> */}
    </div>

  );
}

export default SettingsPage;
