import Link from 'next/link';
import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <Image src="/IndieLogo2.png" height={200} width={200} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40px' }} />
      <div style={{
        padding: '5px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      >
        <div style={{
          border: 'white solid 2px', padding: '80px', backgroundColor: '#212529', borderRadius: '30px',
        }}
        >
          <h1 style={{ fontWeight: '100' }}>Welcome</h1>
          <h3 style={{ fontWeight: '800' }}> {user.displayName}! </h3>
          <br />
          <div className="d-grid gap-3">
            <Link href="/showForm" passHref>
              <Button variant="light" size="lg">
                Add New Show
              </Button>
            </Link>
            <Link href="/showFullTour" passHref>
              <Button variant="light" size="lg">
                View Full Tour
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
