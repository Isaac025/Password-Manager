require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Password Manager server" });
});
app.use("/api/users", userRoutes);
app.use("/api/passwords", passwordRoutes);

//error route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Password-Manager",
    });
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
      console.log("DB connected");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
