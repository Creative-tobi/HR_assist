// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api");

const app = express();

// Middleware
app.use(cors()); // Allows your React frontend to communicate with this API
app.use(express.json()); // Allows the server to parse incoming JSON payloads


app.use("/api", apiRoutes);

// Global Error Handler for unhandled requests
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[CORE ONLINE] TalentDecode Engine running on port ${PORT}`);
});
