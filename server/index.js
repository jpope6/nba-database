// app.js

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "nba-db",
});

// Define a simple route
app.get("/standings", (req, res) => {

  db.query("SELECT PTS_Home FROM games WHERE GAME_DATE_EST", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// Start the server
app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
