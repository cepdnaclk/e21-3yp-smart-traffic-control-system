// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css'; 

// function App() {
//   const [trafficData, setTrafficData] = useState([]);

//   // Function to fetch data from your Backend
//   const fetchTraffic = () => {
//     axios.get('http://localhost:5000/api/traffic')
//       .then(response => setTrafficData(response.data))
//       .catch(error => console.log("Error fetching data:", error));
//   };

//   // Function to send MQTT commands via the Backend
//   const sendCommand = async (location, command) => {
//     try {
//       // Sends the control signal to the new backend route
//       await axios.post('http://localhost:5000/api/traffic/control', { location, command });
//       alert(`Command ${command} sent to ${location}`);
//     } catch (error) {
//       console.error("Control error:", error);
//       alert("Failed to send command. Check if Backend is running.");
//     }
//   };

//   // Fetch data every 2 seconds (Real-time simulation)
//   useEffect(() => {
//     const interval = setInterval(fetchTraffic, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h1>🚦 H.Y.D.R.A Control Center</h1>
//       <p>Real-time Smart Traffic Management System</p>
//       <hr />
      
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//         {/* If no data, show loading */}
//         {trafficData.length === 0 ? (
//           <p>Waiting for sensor data... (Ensure your Backend and Virtual Sensor are running)</p>
//         ) : (
//           trafficData.map((road, index) => (
//             <div key={index} style={{ 
//               border: '1px solid #ccc', 
//               padding: '20px', 
//               borderRadius: '10px',
//               minWidth: '250px',
//               backgroundColor: road.congestionLevel === 'High' ? '#ffcccc' : '#ccffcc',
//               boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//             }}>
//               <h2>{road.location}</h2>
//               <p>Congestion: <strong>{road.congestionLevel}</strong></p>
//               <p>Vehicles Count: {road.vehicleCount}</p>
//               <p><small>Last Update: {new Date(road.timestamp).toLocaleTimeString()}</small></p>
              
//               {/* Control Buttons Section */}
//               <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
//                 <button 
//                   onClick={() => sendCommand(road.location, 'RED')} 
//                   style={{ backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
//                 >
//                   Force RED
//                 </button>
//                 <button 
//                   onClick={() => sendCommand(road.location, 'GREEN')} 
//                   style={{ backgroundColor: '#5cb85c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
//                 >
//                   Force GREEN
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './App.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [trafficData, setTrafficData] = useState([]);

  const fetchTraffic = () => {
    axios.get('http://localhost:5000/api/traffic')
      .then(response => setTrafficData(response.data))
      .catch(error => console.log("Error fetching data:", error));
  };

  const sendCommand = async (location, command) => {
    try {
      await axios.post('http://localhost:5000/api/traffic/control', { location, command });
      alert(`Command ${command} sent to ${location}`);
    } catch (error) {
      console.error("Control error:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchTraffic, 2000);
    return () => clearInterval(interval);
  }, []);

  // Prepare Chart Data
  const chartData = {
    labels: trafficData.map(d => new Date(d.timestamp).toLocaleTimeString()).reverse(),
    datasets: [
      {
        label: 'Vehicle Count Trend',
        data: trafficData.map(d => d.vehicleCount).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1>🚦 H.Y.D.R.A Control Center</h1>
      
      {/* Chart Section */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {trafficData.length === 0 ? <p>Waiting for sensor data...</p> : 
          trafficData.map((road, index) => (
            <div key={index} style={{ 
              border: '1px solid #ddd', 
              padding: '20px', 
              borderRadius: '12px',
              backgroundColor: road.congestionLevel === 'High' ? '#ffebee' : '#e8f5e9',
              minWidth: '280px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h2>{road.location}</h2>
              <p>Congestion: <strong>{road.congestionLevel}</strong></p>
              <p>Vehicles: {road.vehicleCount}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => sendCommand(road.location, 'RED')} style={{ backgroundColor: '#ef5350', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Red</button>
                <button onClick={() => sendCommand(road.location, 'GREEN')} style={{ backgroundColor: '#66bb6a', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Green</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;