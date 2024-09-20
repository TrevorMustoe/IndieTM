import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '100vh',
        padding: '30px',
        maxWidth: '100vw',
        margin: '0 auto',
        alignItems: 'center',
        backgroundColor: 'var(--accent-color-1)',
      }}
    >
      <Image
        src="/IndieLogo2.png"
        height={200}
        width={200}
      />
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
