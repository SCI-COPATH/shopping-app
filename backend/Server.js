const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")

const db = require("./db/connection.js")
const md5 = require("md5")
const user_secret_key = "kanfkahbf3a65a1afbhg"
const admin_secret_key = "4pkbjeb46lmkjhe6j546"

const app = express()
const port = 8081
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true)
  } else {
    callback(null, Error("only image is allowd"))
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/items")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  fileFilter: isImage,
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
const adminAuthenticate = (req, res, next) => {
  const token = req.header("Authorization")

  console.log("Unextracted Token: " + token)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const extractedToken = token.split(" ")[1]
  console.log("Actual TOken: " + extractedToken)

  try {
    // /verift and validate our token
    const decoded = jwt.verify(extractedToken, admin_secret_key)
    req.userId = decoded.userId
    next()
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" })
  }
}

function authantication(token, key, req) {
  if (!token) {
    return { message: "Unauthorized" }
  }
  const extractedToken = token
  // console.log("Actual TOken: " + extractedToken)

  try {
    // /verift and validate our token
    const decoded = jwt.verify(extractedToken, key)
    req.userId = decoded.userId
  } catch (err) {
    return { message: "Invalid Token" }
  }
  return { message: "Sucess" }
}
app.post("/checkAuth", async (req, res) => {
  const { token, userId, userType } = req.body
  const responce = authantication(token, admin_secret_key, req)
  if (responce.message != "Sucess") {
    let keys = [user_secret_key, admin_secret_key]
    let key
    if (userType == "admin") {
      key = keys[1]
    } else {
      key = keys[0]
    }
    const token = jwt.sign({ userId: userId }, key, { expiresIn: "1h" })
    res.json({
      message: "Token Retake",
      status: true,
      user: {
        userName: userId,
        token: token,
        avatar: getAvatar(userId),
        userType: userType,
      },
    })
  } else {
    res.json({
      message: "token Expried",
      status: false,
      user: {
        userName: "",
        token: "",
        avatar: "",
        userType: "",
      },
    })
  }
})
app.get("/product-list", (req, res) => {
  const sql = "SELECT * FROM items"

  db.query(sql, [], (err, result) => {
    if (err) {
      console.log("Error Searching for userId: " + err)
      res.status(404).json({ message: "No username found" })
    } else {
      res.json({ message: "Sucess", data: result })
    }
  })
})
app.post("/addItems", upload.single("image"), async (req, res) => {
  const { token, name, catagory, qty, mrp, realRate, discription, brand } = req.body
  const { filename } = req.file
  console.log(filename)
  console.log(name)
  console.log(catagory)
  console.log(qty)
  console.log(mrp)
  console.log(realRate)
  console.log(discription)
  console.log(brand)
  const responce = authantication(token, admin_secret_key, req)
  if (responce.message != "Sucess") {
    res.status(401).json(responce)
  }

  const sql = "INSERT INTO items (name, catagory, qty, mrp, rate, discription, brand, imgae) VALUES (?,?,?,?,?,?,?,?)"
  db.query(sql, [name, catagory, qty, mrp, realRate, discription, brand, filename], (err, result) => {
    if (err) {
      console.log("Error In Registration: " + err)
      res.status(403).json({ message: "Token-Sucess db-error" })
    } else {
      const sql = "SELECT * FROM items"

      db.query(sql, [], (err, result) => {
        if (err) {
        } else {
          res.json({ message: "Sucess", data: result })
        }
      })
    }
  })
})

function getAvatar(mail) {
  return `https://gravatar.com/avatar/${md5(mail)}?s=128`
}

app.get("/", (req, res) => {
  return res.json("Server is Redy to run")
})
//Registration Endpoint
app.post("/register", async (req, res) => {
  const { userName, userType, userId, password } = req.body

  //Hash the Password
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  console.log(hashedPassword.length)

  const sql = "INSERT INTO users (userName, userType, userId, password) VALUES (?, ?, ?, ?)"
  db.query(sql, [userName, userType, userId, hashedPassword], (err, result) => {
    if (err) {
      console.log("Error In Registration: " + err)
    } else {
      let token
      if (userType != "6546ajhgawd") {
        token = jwt.sign({ userId: userId }, user_secret_key, { expiresIn: "1h" })
      } else {
        token = jwt.sign({ userId: userId }, admin_secret_key, { expiresIn: "1h" })
      }
      console.log(token)
      res.json({
        message: "Registration successful",
        user: {
          userName: userName,
          token: token,
          avatar: getAvatar(userId),
          userType: userType,
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
      console.log(result[0].userType)
      if (match) {
        let keys = [user_secret_key, admin_secret_key]
        let key
        if (result[0].userType == "admin") {
          key = keys[1]
        } else {
          key = keys[0]
        }
        //create a jwt token
        const token = jwt.sign({ userId: result[0].id }, key, { expiresIn: "1h" })
        res.json({
          message: "Login Successful",
          user: {
            userName: result[0].userName,
            token: token,
            avatar: getAvatar(userId),
            userType: result[0].userType,
          },
        })
      } else {
        res.status(401).json({ message: "Invalid Password" })
      }
    }
  })
})

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
