const express = require("express");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const alertRoutes = require("./routes/alertRoutes");
const commandRoutes =
  require("./routes/commandRoutes");

const startDeviceMonitor = require("./services/deviceMonitor");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

connectDB();

startDeviceMonitor();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.set("io", io);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/commands", commandRoutes);
app.get("/", (req, res) => {
  res.send("Monitoring API Running");
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});