// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // You can style this later

function App() {
  const [trafficData, setTrafficData] = useState([]);

  // Function to fetch data from your Backend
  const fetchTraffic = () => {
    axios.get('http://localhost:5000/api/traffic')
      .then(response => setTrafficData(response.data))
      .catch(error => console.log("Error fetching data:", error));
  };

  // Fetch data every 2 seconds (Real-time simulation)
  useEffect(() => {
    const interval = setInterval(fetchTraffic, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚦 H.Y.D.R.A Control Center</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* If no data, show loading */}
        {trafficData.length === 0 ? <p>Waiting for sensor data...</p> : 
          trafficData.map((road, index) => (
            <div key={index} style={{ 
              border: '1px solid #ccc', 
              padding: '20px', 
              borderRadius: '10px',
              backgroundColor: road.congestionLevel === 'High' ? '#ffcccc' : '#ccffcc'
            }}>
              <h2>{road.location} Road</h2>
              <p>Congestion: <strong>{road.congestionLevel}</strong></p>
              <p>Vehicles: {road.vehicleCount}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;