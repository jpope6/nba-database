// app.js

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost", // 127.0.0.1
  password: "",
  database: "nba-db",
});

// Define a simple route
app.get("/standings", (req, res) => {
  try {
    const { date } = req.query;

    const query = "SELECT PTS_Home FROM games WHERE GAME_DATE_EST = ?";
    db.query(query, [date], (err, result) => {
      if (err) {
        console.log(err);
        // Handle the error here, such as returning an error response.
        res.status(500).json({ error: "Database query failed" });
      } else {
        // Query was successful, you can access the result here
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    // Handle any other unexpected errors here
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});
// Start the server
app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
