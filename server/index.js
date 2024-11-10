require("dotenv").config()
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors()); 

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get('/data', (req, res) => {
  const query = 'SELECT * FROM city'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error("Query error:", err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results); 
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
