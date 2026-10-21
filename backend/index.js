require("dotenv").config();

const express = require("express");
const { connectToMongoDB, getDB } = require("./config/db");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToMongoDB();

    app.get("/", (req, res) => {
      res.send("MongoDB Atlas connected successfully!");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();