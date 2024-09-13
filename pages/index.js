import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <div style={{
        padding: '5px',
        maxWidth: '400px',
        margin: '0 auto',
        marginTop: '200px',
      }}
      >
        <div style={{
          border: 'var(--accent-color-1) solid 2px',
          padding: '80px',
          backgroundColor: 'var(--accent-color-2)',
          borderRadius: '30px',
          color: 'white',
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
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
