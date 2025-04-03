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
        console.log("Databas connection failed", err);
      }
      else{
        console.log("Connected to MySQL Database");
      }
    } 
  );

  //REGISTER
  
  app.post("/register", async (req, res) =>{
    const{username, password} = req.body;

    if(!username || !password){
      return res.status(400).json({message: "All fields are required"});
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    
    const checkUserSql = "SELECT * FROM userss WHERE username =?";

    db.query(checkUserSql, [username], (err, results) =>{
        if(err){
          return res.status(500).json({message: "Database Error"});
        }
        if(results.length > 0){
          return res.status(400).json({message: "Username already exist"});
        }
    const insertUserSql = "INSERT INTO userss (username, password) VALUES (?,?)"
            db.query(insertUserSql, [username, hashedPassword],
              (err, result) =>{
                if(err) return res.status(500).json({message: "Registration Failed"});
 
                res.status(201).json({message: "User Registered successfully"});
              });
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
      res.json({message:"Login successul", token, username: results[0].username});
    });
  }); 





  app.listen(5000, ()=>{
    console.log("Server running on port 5000")
  });