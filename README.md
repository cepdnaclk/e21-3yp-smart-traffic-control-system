# HYDRA: HYbrid Dynamic Realtime Automation

**Intelligent Traffic Control System with Green Wave Technology**

---

### Project Overview

**HYDRA** is a smart traffic management system designed to eliminate static signal timers and adapt to real-time road conditions. By combining **Edge Computing (ESP32)** with **Cloud Intelligence (Raspberry Pi/MERN Stack)**, HYDRA dynamically adjusts traffic light durations based on vehicle density, queue lengths, and weather conditions.

Key capabilities include:
***Real-time Traffic Adaptive Timing:** Uses ultrasonic and IR sensors to detect vehicle queues and adjust green light duration instantly.
***Emergency "Green Wave":** Automatically clears intersections for approaching ambulances or fire trucks.
***Weather Awareness:** Detects rain and automatically extends yellow light duration to prevent accidents on slippery roads.
***Pedestrian Prioritization:** Smart crossing buttons that manage pedestrian flow without causing massive traffic backups.

### Solution Architecture

The system operates on a **Hybrid Edge-Cloud** model:
1. **Edge Nodes (ESP32):** Located at each junction pole, handling immediate sensor readings (Ultrasonic, IR, Rain) and controlling the lights.
2. **Central Brain (Raspberry Pi):** Acts as the local server and MQTT broker, coordinating the logic between different poles.
3.  **Cloud Dashboard:** A MERN stack application for remote monitoring and manual override control.

---

### Enable GitHub Pages

The documentation for this project is hosted via GitHub Pages.
1.  Go to **Settings** > **Pages**.
2.  Select the **main** branch and the **docs/** folder.
3.  Click **Save**.

Project page will be available at: `https://cepdnaclk.github.io/e21-3yp-HYDRA

---

### Project Configuration (`docs/index.json`)

To list this project on the unified engineering projects site, update your `docs/index.json` file with the following content:

```json
{
  "title": "HYDRA: HYbrid Dynamic Realtime Automation",
  "team": [
    {
      "name": "Diwyanjali Jayasooriya",
      "email": "e21196@eng.pdn.ac.lk",
      "eNumber": "E/21/196"
    },
    {
      "name": "Samadhini Perera",
      "email": "e21289@eng.pdn.ac.lk",
      "eNumber": "E/21/289"
    },
    {
      "name": "Vedangi Nadeeshani",
      "email": "e21193@eng.pdn.ac.lk",
      "eNumber": "E/21/193"
    }
  ],
  "supervisors": [
    {
      "name": "Ms. Yashodha Vimukthi",
      "email": "yasodhav@eng.pdn.ac.lk"
    },
    {
      "name": "Thiliru Samaradiwakara",
      "email": "e19489@eng.pdn.ac.lk"
    }
  ],
  "tags": [
    "IoT",
    "Embedded Systems",
    "Smart City",
    "Automation",
    "Cloud Computing"
  ]
}