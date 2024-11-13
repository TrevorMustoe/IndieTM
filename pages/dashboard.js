import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ShowFullTour from './showFullTour';
import NavigationBar from '../components/NavBar';

function Dashboard() {
  return (
    <div className="dashMain">
      <header className="header">
        <div>
          <NavigationBar />
        </div>
      </header>
      <section className="sidebar">
        <div>

          {/* <div
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
          </div> */}

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

          <div className="lines" />

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

          <div className="lines" />

        </div>
      </section>
      <main className="main">
        <ShowFullTour />
      </main>
    </div>
  );
}

export default Dashboard;
