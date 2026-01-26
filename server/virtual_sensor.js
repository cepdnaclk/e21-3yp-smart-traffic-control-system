const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

const myLocation = "Galle Road";

client.on('connect', () => {
    console.log(`📡 Sensor for ${myLocation} is Online!`);
    
    // Subscribe to commands for THIS specific location
    client.subscribe(`traffic/control/${myLocation}`);
});

// Listen for incoming commands from the dashboard
client.on('message', (topic, message) => {
    const command = JSON.parse(message.toString());
    console.log(`🛑 COMMAND RECEIVED: Change light to ${command.action}`);
});

// Keep sending data as before...
setInterval(() => {
    client.publish('traffic/data', JSON.stringify({
        location: myLocation,
        congestionLevel: "High",
        vehicleCount: Math.floor(Math.random() * 100)
    }));
}, 5000);