require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect(err => {
  if (err) {
    console.error("Errore di connessione al DB:", err);
    return;
  }
  console.log("Connesso a MySQL!");
});

app.get("/api/eventi", (req, res) => {
  db.query("SELECT * FROM eventi", (err, results) => {
    if (err) {
      res.status(500).send("Errore nel recupero eventi");
    } else {
      res.json(results);
    }
  });
});

app.listen(process.env.PORT, () => console.log(`Server avviato su ${process.env.PORT}`));
