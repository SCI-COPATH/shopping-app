const mysql = require("mysql")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ShoppingProject",
})

db.getConnection((err, con) => {
  if (err) {
    console.log(`Could not connect to the database ${err}`)
  } else {
    console.log("Succesfully connected to the database")
  }
})

module.exports = db
