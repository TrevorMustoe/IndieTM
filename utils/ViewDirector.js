import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavigationBar from '../components/NavBar';

// test

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <div className="dashMain">
          <header className="header">
            <div>
              <NavigationBar />
            </div>
          </header>
          <section className="sidebar">
            <Link href="/">
              <div className="sideLinks-one">
                <Button
                  style={{
                    color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', border: '0px', fontSize: '15px',
                  }}
                  href="/"
                >Home
                </Button>
              </div>
            </Link>
            <Link href="/showFullTour">
              <div className="sideLinks">
                <Button
                  style={{
                    color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', border: '0px', fontSize: '15px',
                  }}
                  href="/showFullTour"
                >Tours
                </Button>
              </div>
            </Link>
            <Link href="/showsPage">
              <div className="sideLinks">
                <Button
                  style={{
                    color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', border: '0px',
                  }}
                  href="/showsPage"
                >Shows
                </Button>
              </div>
            </Link>
            <Link href="/settingPage">
              <div className="sideLinks">
                <Button
                  style={{
                    color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', border: '0px',
                  }}
                  href="/settingPage"
                >Settings
                </Button>
              </div>
            </Link>
          </section>
          <main className="main">
            <div className="container">
              <Component {...pageProps} />
            </div>
          </main>
        </div>

      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
