<img width="1629" height="966" alt="image" src="https://github.com/user-attachments/assets/c4ebb136-b014-4645-b053-d0f665c2b5cd" /># MonitorX

Enterprise-grade real-time infrastructure monitoring and device management platform built with MERN stack technologies.

(<img width="1629" height="966" alt="image" src="https://github.com/user-attachments/assets/764ec886-88f7-4df8-8436-cae1f3d0589f" />)

---

# Features

## Real-Time Monitoring
- Live device monitoring
- CPU usage tracking
- RAM usage tracking
- Device uptime monitoring
- Online/offline status tracking
- Real-time updates using Socket.IO

## Device Management
- Centralized device dashboard
- Device-specific detail pages
- System health monitoring
- IP address tracking
- Operating system monitoring
- Hardware information collection

## Global Infrastructure Map
- Worldwide device visualization
- Live device activity markers
- Interactive infrastructure monitoring map

## Alerts & Notifications
- High CPU usage alerts
- High RAM usage alerts
- Real-time alert updates
- Activity feed monitoring

## Authentication & RBAC
- JWT authentication
- Protected routes
- Role-based access control
- Admin / Operator / Viewer roles

## Modern Enterprise UI
- Responsive dashboard
- Glassmorphism design
- Real-time activity feed
- Collapsible sidebar
- Modern SaaS-style interface

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Socket.IO Client
- Leaflet Maps
- React Icons

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- bcryptjs

## Monitoring Agent
- Python
- psutil
- requests

---

# Project Structure

```bash
monitoring-system/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── package.json
│
└── README.md
```

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/MonitorX.git
cd MonitorX
```

---

# Backend Setup

## 2. Install Backend Dependencies

```bash
cd server
npm install
```

## 3. Create Environment File

Create:

```bash
server/.env
```

Add:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

## 4. Start Backend

```bash
npm run dev
```

---

# Frontend Setup

## 5. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 6. Start Frontend

```bash
npm run dev
```

---

# Monitoring Agent Setup

The Python monitoring agent sends device metrics to the backend server.

## Install Dependencies

```bash
pip install psutil requests
```

## Run Agent

```bash
python agent.py
```

---

# Roles

| Role | Access |
|------|------|
| Admin | Full access |
| Operator | Monitoring access |
| Viewer | Read-only access |

---

# Screenshots

## Dashboard
- Real-time infrastructure monitoring
- Live device metrics
- Infrastructure map
- Activity feed

## Device Details
- Device performance metrics
- CPU & RAM charts
- Device information

---

# Future Improvements

- Remote terminal execution
- Remote device actions
- Docker monitoring
- Kubernetes monitoring
- Email notifications
- AI anomaly detection
- System logs collection
- Network traffic monitoring
- Dark/Light theme system
- Multi-organization support

---

# Security

- JWT authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based authorization

---

# License

This project is licensed under the MIT License.

---

# Author

Developed by Kavinda Sandaru

Software Engineering Undergraduate
Sri Lanka

Main frontend dependencies:

- react
- react-dom
- react-router-dom
- axios
- socket.io-client
- leaflet
- react-leaflet
- react-icons

---

# Required Backend Packages

Installed automatically using:

```bash
npm install
```

Main backend dependencies:

- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- cors
- socket.io
- nodemon

---

# Required Python Packages

Install manually:

```bash
pip install psutil requests
```

Packages:
- psutil
- requests

---

# Common Errors & Fixes

## 1. MongoDB Connection Error

### Error

```bash
MongooseServerSelectionError
```

### Cause
MongoDB URI is incorrect or MongoDB Atlas IP whitelist is not configured.

### Fix

- Check `.env`
- Verify `MONGO_URI`
- Add your IP address in MongoDB Atlas:
  - Network Access
  - Add Current IP

---

## 2. JWT Secret Missing

### Error

```bash
secretOrPrivateKey must have a value
```

### Cause
`JWT_SECRET` is missing inside `.env`.

### Fix

Add:

```env
JWT_SECRET=mysecretkey
```

---

## 3. Port Already In Use

### Error

```bash
EADDRINUSE
```

### Cause
Another process is already using the port.

### Fix

Change port in `.env`:

```env
PORT=5001
```

Or stop the existing process.

---

## 4. React App Not Loading

### Error

```bash
Failed to fetch
```

### Cause
Backend server is not running.

### Fix

Start backend first:

```bash
cd server
npm run dev
```

---

## 5. CORS Error

### Error

```bash
Access-Control-Allow-Origin
```

### Cause
CORS middleware missing or frontend URL mismatch.

### Fix

Inside backend:

```js
app.use(cors());
```

---

## 6. Invalid Credentials On Login

### Cause
User does not exist in database or password is incorrect.

### Fix

Register a user first or verify database user records.

---

## 7. Leaflet Map Not Displaying

### Cause
Leaflet CSS missing.

### Fix

Inside:

```bash
main.jsx
```

Add:

```js
import "leaflet/dist/leaflet.css";
```

---

## 8. Sidebar/Layout Misalignment

### Cause
Sidebar fixed width not matching content padding.

### Fix

Ensure:

```jsx
<main className="pl-64">
```

matches sidebar width.

---

## 9. Socket.IO Realtime Updates Not Working

### Cause
Socket server not initialized properly.

### Fix

Verify backend Socket.IO setup and frontend socket connection.

---

## 10. Python Agent Not Sending Data

### Cause
Backend URL incorrect or backend offline.

### Fix

Check:

```python
SERVER_URL
```

inside Python agent.

Ensure backend is running.

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

---

# How To Run The Full Project

## Terminal 1 — Backend

```bash
cd server
npm install
npm run dev
```

---

## Terminal 2 — Frontend

```bash
cd client
npm install
npm run dev
```

---

## Terminal 3 — Python Agent

```bash
python agent.py
```

---

# Default URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

---

# Recommended VS Code Extensions

- ES7+ React Snippets
- Tailwind CSS IntelliSense
- Prettier
- MongoDB for VS Code
- Python

---

# Recommended Browser

- Google Chrome
- Microsoft Edge

---

# Performance Notes

- Real-time monitoring uses Socket.IO
- Frequent polling may increase MongoDB writes
- Recommended to use MongoDB Atlas M0+ cluster
- Recommended minimum RAM: 8GB

---
