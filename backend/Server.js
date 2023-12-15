const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("./db/connection.js")

const user_secret_key = "kanfkahbf3a65a1afbhg"
const app = express()
const port = 8081
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  return res.json("Server is Redy to run")
})
//Registration Endpoint
app.post("/register", async (req, res) => {
  const { userName, userId, password } = req.body

  //Hash the Password
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  console.log(hashedPassword.length)

  const sql = "INSERT INTO users (userName, userId, password) VALUES (?, ?, ?)"
  db.query(sql, [userName, userId, hashedPassword], (err, result) => {
    if (err) {
      console.log("Error In Registration: " + err)
    } else {
      const token = jwt.sign({ userId: userId }, user_secret_key, { expiresIn: "1h" })

      console.log(token)
      res.json({
        message: "Registration successful",
        user: {
          userName: userName,
          token: token,
        },
      })
    }
  })
})

//Login Endpoint

app.post("/login", async (req, res) => {
  const { userId, password } = req.body
  //Check if username and password are present
  if (!userId || !password) {
    return res.status(400).json({ message: "userId and Password are Required" })
  }

  const sql = "SELECT * FROM users WHERE userId = ?"
  db.query(sql, [userId], async (err, result) => {
    if (err || result.length === 0) {
      console.log("Error Searching for userId: " + err)
      res.status(404).json({ message: "No username found" })
    } else {
      //compare hashed password
      const match = await bcrypt.compare(password, result[0].password)
      console.log(result[0].userName)
      if (match) {
        //create a jwt token
        const token = jwt.sign({ userId: result[0].id }, user_secret_key, { expiresIn: "1h" })
        res.json({
          message: "Login Successful",
          user: {
            userName: result[0].userName,
            token: token,
          },
        })
      } else {
        res.status(401).json({ message: "Invalid Password" })
      }
    }
  })
})

//Authentication Middleware using JWT
const userAuthenticate = (req, res, next) => {
  const token = req.header("Authorization")
  console.log("Unextracted Token: " + token)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const extractedToken = token.split(" ")[1]
  console.log("Actual TOken: " + extractedToken)

  try {
    // /verift and validate our token
    const decoded = jwt.verify(extractedToken, user_secret_key)
    req.userId = decoded.userId
    next()
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" })
  }
}

app.get("/profile", userAuthenticate, (req, res) => {
  const userId = req.userId
  const sql = "SELECT * FROM users WHERE id = ?"
  db.query(sql, [userId], (err, result) => {
    if (err || result.length === 0) {
      res.status(500).json({ message: "Error Fetching Details" })
    } else {
      res.json({ username: result[0].username })
    }
  })
})

// Product LIst endpont
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products"
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error Fetching Products" })
    } else {
      res.json(result)
    }
  })
})

app.listen(port, () => {
  console.log("Server is running ✌🏾")
})
