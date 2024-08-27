import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddShowForm() {
  return (
    <Form>
      <div>
        <div style={{
          display: 'flex',
        }}
        >
          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
          }}
          >
            <label htmlFor="loadInTime">Enter Date:</label>
            <input
              id="loadInTime"
              type="text"
              label="Hello"
              placeholder="Load In Time"
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
              required
            />
            <br /><br />
          </div>

          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
          }}
          >
            <label htmlFor="soundCheck">Enter State:</label>
            <input
              id="soundCheck"
              type="text"
              label="Hello"
              placeholder="Enter State"
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
              required
            />
            <br /><br />
          </div>
        </div>

        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
        }}
        >
          <label htmlFor="city">City Name:</label>
          <input
            id="city"
            type="text"
            label="Hello"
            placeholder="Enter City Name"
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
            required
          />
          <br /><br />
        </div>

        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
        }}
        >

          <label htmlFor="venueName">Venue Name:</label>
          <input
            id="hotelName"
            type="text"
            label="Hello"
            placeholder="Enter Hotel Name"
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
            required
          />
          <br /><br />
        </div>

        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
        }}
        >
          <label htmlFor="hotelName">Hotel Name:</label>
          <input
            id="hotelName"
            type="text"
            label="Hello"
            placeholder="Enter Hotel Name"
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
            required
          />
          <br /><br />
        </div>

        <div style={{ display: 'flex', alignContent: 'space-between' }}>
          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
          }}
          >
            <label htmlFor="loadInTime">Load In:</label>
            <input
              id="loadInTime"
              type="text"
              label="Hello"
              placeholder="Load In Time"
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
              required
            />
            <br /><br />
          </div>

          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
          }}
          >
            <label htmlFor="soundCheck">Sound Check:</label>
            <input
              id="soundCheck"
              type="text"
              label="Hello"
              placeholder="Enter Hotel Name"
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
              required
            />
            <br /><br />
          </div>
        </div>

        <div style={{
          display: 'flex',
        }}
        >
          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
          }}
          >
            <label htmlFor="doorTime">Door Time:</label>
            <input
              id="doorTime"
              type="text"
              label="Hello"
              placeholder="Door Time"
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
              required
            />
            <br /><br />
          </div>

          <div style={{
            flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
          }}
          >
            <label htmlFor="setTime">Set Time:</label>
            <input
              id="setTime"
              type="text"
              label="Hello"
              placeholder="Set Time"
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'solid white 2px',
              }}
              required
            />
            <br /><br />
          </div>
        </div>

        <div style={{
          flexDirection: 'column', marginRight: '5px', marginLeft: '5px', marginBottom: '0px', paddingRight: '10px', paddingLeft: '10px',
        }}
        >
          <label htmlFor="loadOut">loadOut:</label>
          <input
            id="loadOut"
            type="text"
            label="Hello"
            placeholder="Load Out"
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'solid white 2px',
            }}
            required
          />
          <br /><br />
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default AddShowForm;
