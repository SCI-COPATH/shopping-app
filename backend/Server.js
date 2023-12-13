const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ShoppingProject",
})

app.get("/", (req, res) => {
  return res.json("From backend side")
})

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users"
  db.query(sql, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO users (`name`,`userId`,`password`)"
  const values = [req.body.name, req.body.userId, req.body.password]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("error")
    return res.json(data)
  })
})
app.listen(8081, () => {
  console.log("listing")
})
