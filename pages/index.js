import Link from 'next/link';
import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <Image src="/IndieLogo2.png" height={200} width={200} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '100px' }} />
      <div style={{
        padding: '10px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      >
        <h1>Welcome,</h1>
        <h1> {user.displayName}! </h1>
        <br />
        <div className="d-grid gap-2">
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
  );
}

export default Home;
