// app.js

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost", // 127.0.0.1, localhost
  password: "February#14",
  database: "nba-db",
});

app.get("/getGameIDs", (req, res) => {
  try {
    const { date } = req.query;
    //const query = "SELECT * FROM games WHERE GAME_DATE_EST = ?";
    const query = "SELECT GAME_ID FROM games WHERE GAME_DATE_EST = ?";
    db.query(query, [date], (err, gameIDs) => {
      if (err) {
        console.log(err);
        // Handle the error here, such as returning an error response.
        res.status(500).json({ error: "Database query failed" });
      } else {
        // Query was successful, you can access the result here
        res.status(200).json({ gameIDs });
      }
    });
  } catch (error) {
    // Handle any other unexpected errors here
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/getTeamDetails", (req, res) => {
  try {
    const { teamID } = req.query;

    //const query = "SELECT * FROM games WHERE GAME_DATE_EST = ?";
    const query = "SELECT CITY, NICKNAME FROM teams WHERE TEAM_ID = ?";
    db.query(query, [teamID], (err, teamDetails) => {
      if (err) {
        console.log(err);
        // Handle the error here, such as returning an error response.
        res.status(500).json({ error: "Database query failed" });
      } else {
        // Query was successful, you can access the result here
        res.status(200).json({ teamDetails });
      }
    });
  } catch (error) {
    // Handle any other unexpected errors here
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/getGameDetails", async (req, res) => {
  try {
    const { gameIDs } = req.query;

    // Ensure gameIDs is an array
    const gameIDsArray = Array.isArray(gameIDs) ? gameIDs : [gameIDs];

    const gameDetailsArray = [];

    const query = "SELECT GAME_ID, HOME_TEAM_ID, VISITOR_TEAM_ID, PTS_HOME, PTS_AWAY FROM games WHERE GAME_ID = ?";

    for (const game of gameIDsArray) {
      console.log(game);
      const gameID = game.GAME_ID;
      const gameDetails = await new Promise((resolve, reject) => {
        db.query(query, [gameID], (err, result) => {
          if (err) {
            console.log(err);
            reject("Database query failed");
          } else {
            // Query was successful, you can access the result here
            resolve(result);
            console.log(result);
          }
        });
      });

      gameDetailsArray.push(gameDetails[0]);
    }

    res.status(200).json({ gameDetailsArray });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/getPlayerDetails", (req, res) => {
  try {
    const { gameID, teamID } = req.query;

    const query = "SELECT PLAYER_NAME, MIN, PTS, AST, REB, BLK, STL, `TO`, PLUS_MINUS FROM games_details WHERE GAME_ID = ? AND TEAM_ID = ?";
    db.query(query, [gameID, teamID], (err, playerDetails) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Database query failed" });
      } else {
        // Query was successful, you can access the result here
        res.status(200).json({ playerDetails });
      }
    })

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Start the server
app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
