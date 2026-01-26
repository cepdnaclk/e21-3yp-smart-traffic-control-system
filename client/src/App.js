// // client/src/App.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css'; // You can style this later

// function App() {
//   const [trafficData, setTrafficData] = useState([]);

//   // Function to fetch data from your Backend
//   const fetchTraffic = () => {
//     axios.get('http://localhost:5000/api/traffic')
//       .then(response => setTrafficData(response.data))
//       .catch(error => console.log("Error fetching data:", error));
//   };

//   // Fetch data every 2 seconds (Real-time simulation)
//   useEffect(() => {
//     const interval = setInterval(fetchTraffic, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h1>🚦 H.Y.D.R.A Control Center</h1>
//       <div style={{ display: 'flex', gap: '20px' }}>
//         {/* If no data, show loading */}
//         {trafficData.length === 0 ? <p>Waiting for sensor data...</p> : 
//           trafficData.map((road, index) => (
//             <div key={index} style={{ 
//               border: '1px solid #ccc', 
//               padding: '20px', 
//               borderRadius: '10px',
//               backgroundColor: road.congestionLevel === 'High' ? '#ffcccc' : '#ccffcc'
//             }}>
//               <h2>{road.location} Road</h2>
//               <p>Congestion: <strong>{road.congestionLevel}</strong></p>
//               <p>Vehicles: {road.vehicleCount}</p>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [trafficData, setTrafficData] = useState([]);

  // Function to fetch data from your Backend
  const fetchTraffic = () => {
    axios.get('http://localhost:5000/api/traffic')
      .then(response => setTrafficData(response.data))
      .catch(error => console.log("Error fetching data:", error));
  };

  // Function to send MQTT commands via the Backend
  const sendCommand = async (location, command) => {
    try {
      // Sends the control signal to the new backend route
      await axios.post('http://localhost:5000/api/traffic/control', { location, command });
      alert(`Command ${command} sent to ${location}`);
    } catch (error) {
      console.error("Control error:", error);
      alert("Failed to send command. Check if Backend is running.");
    }
  };

  // Fetch data every 2 seconds (Real-time simulation)
  useEffect(() => {
    const interval = setInterval(fetchTraffic, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚦 H.Y.D.R.A Control Center</h1>
      <p>Real-time Smart Traffic Management System</p>
      <hr />
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* If no data, show loading */}
        {trafficData.length === 0 ? (
          <p>Waiting for sensor data... (Ensure your Backend and Virtual Sensor are running)</p>
        ) : (
          trafficData.map((road, index) => (
            <div key={index} style={{ 
              border: '1px solid #ccc', 
              padding: '20px', 
              borderRadius: '10px',
              minWidth: '250px',
              backgroundColor: road.congestionLevel === 'High' ? '#ffcccc' : '#ccffcc',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <h2>{road.location}</h2>
              <p>Congestion: <strong>{road.congestionLevel}</strong></p>
              <p>Vehicles Count: {road.vehicleCount}</p>
              <p><small>Last Update: {new Date(road.timestamp).toLocaleTimeString()}</small></p>
              
              {/* Control Buttons Section */}
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => sendCommand(road.location, 'RED')} 
                  style={{ backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Force RED
                </button>
                <button 
                  onClick={() => sendCommand(road.location, 'GREEN')} 
                  style={{ backgroundColor: '#5cb85c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Force GREEN
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;