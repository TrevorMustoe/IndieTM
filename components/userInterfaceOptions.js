import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function UiOptions() {
  // Initialize dark mode state from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const darkModeToggle = (e) => {
    const newMode = e.target.checked;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode)); // Save preference
  };

  useEffect(() => {
    document.querySelector('body').setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div style={{
      marginTop: '10%',
      marginBottom: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
    >
      <hr width="30%;" color="black" size="5" />
      <h5> Light Mode / Dark Mode</h5>
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
          <Button style={{ width: '40px', backgroundColor: '#273c4d', height: '20px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button style={{ width: '40px', backgroundColor: '#274d2d', height: '20px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button style={{ width: '40px', backgroundColor: '#4d274c', height: '20px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button style={{ width: '40px', backgroundColor: '#4d2727', height: '20px' }} />
        </div>
      </div>
      <hr width="30%;" color="black" size="5" />
    </div>

  );
}

export default UiOptions;
