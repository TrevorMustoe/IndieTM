import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <div
        className="startBox"

      >
        <div
          className="startBox2"
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
