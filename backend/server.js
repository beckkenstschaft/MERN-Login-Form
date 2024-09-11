const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Serve the specific index.html for /welcome route
// app.get("/welcome", (req, res) => {
//   res.sendFile("C:\\Users\\hp\\Documents\\Documents\\Ongoing_Project\\updated_ats\\public\\index.html");
// });

app.get("/welcome", (req, res) => {
  res.redirect("http://localhost:3002/index.html");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
