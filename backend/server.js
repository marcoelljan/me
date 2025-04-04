const express = require("express");
const mysql2 = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());


const db = mysql2.createPool(
  {
      host:"localhost",
      user:"root",
      password:"",
      database:"user_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
  });

  db.getConnection(
    (err) =>{
      if(err){
        console.log("Database connection failed", err);
      }
      else{
        console.log("Connected to MySQL Database");
      }
    } 
  );

  //REGISTER
  
  app.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    console.log ("Received Payload:", {username, password, role});

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    db.query("INSERT INTO userss (username, password, role) VALUES (?, ?, ?)", [username, hashedPassword, role], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });

  //LOGIN USER
  app.post("/login", (req, res) =>{
    const {username, password} = req.body;

    if (!username || !password){
      return res.status(400).json({ message:"All fields are required"});
    }

    const sql = "SELECT * FROM userss WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
      if(err || results.length === 0){
        return res.status(400).json({message:"Invalid username or password"});
      }


      
      
      const isMatch = await bcrypt.compare(password, results[0].password);

      if(!isMatch){
        return res.status(400).json({message: "Invalid username or password"});
      }

      const token = jwt.sign({ id: results[0].id, username: results[0].username}, process.env.JWT_SECRET, { expiresIn:"1h"});
      res.json({message:"Login successul", token, username: results[0].username, role: results[0].role});
    });
  }); 

  //DESCRIBE USERS
  app.get("/describe-userss", (req, res) => {
    db.query("DESCRIBE userss", (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
    });
  });

  app.listen(5000, ()=>{
    console.log("Server running on Port 5000")
  });

 