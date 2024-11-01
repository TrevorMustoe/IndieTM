import PropTypes from 'prop-types';
import Image from 'next/image';
import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavigationBar from '../components/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const [darkMode, setDarkMode] = useState(false);

  const darkModeToggle = (e) => {
    setDarkMode(e.target.checked);
  };

  useEffect(() => {
    document.querySelector('body').setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

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
            <div>

              <div
                style={{
                  marginLeft: '10%', marginRight: '10%', marginTop: '60px',
                }}
                className="userInfo"
              >
                <Image
                  src="/IndieLogo2.png"
                  height={200}
                  width={200}
                />
              </div>

              <div className="lines" />
              <Link href="/">
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="sideLinks">
                  <Button
                    style={{
                      marginRight: '20px', color: 'white', border: '0px', backgroundColor: 'rgba(0, 0, 0, 0)',
                    }}
                    href="/"
                  >Home
                  </Button>
                  <div className="iconhome">
                    <Image
                      src="/house.png"
                      height={30}
                      width={30}
                    />
                  </div>
                </div>
              </Link>

              <div className="lines" />
              <Link href="/showForm">
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="sideLinks">
                  <Button
                    style={{
                      marginRight: '20px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', border: '0px',
                    }}
                    href="/showForm"
                  >Add Show
                  </Button>
                  <div className="iconhome">
                    <Image
                      src="/addshow.png"
                      height={30}
                      width={30}
                      border="solid blue 5px"
                    />
                  </div>
                </div>
              </Link>

              <div className="lines" />
              <Link href="/showFullTour">
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="sideLinks">
                  <Button
                    style={{
                      marginRight: '20px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', border: '0px',
                    }}
                    href="/showFullTour"
                  >Tours
                  </Button>
                  <div className="iconhome">
                    <Image
                      src="/tourpic.png"
                      height={30}
                      width={30}
                      border="solid blue 5px"
                    />
                  </div>
                </div>
              </Link>

              <div className="lines" />

              <div style={{ display: 'flex', justifyContent: 'space-evenly' }} className="sideLinks">
                <h5>☀️</h5>
                <Form.Switch onChange={darkModeToggle} />
                <h5>🌙</h5>
              </div>
            </div>
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
