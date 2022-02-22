const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()
app.use(cors())

app.get("/data", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("data.json"))
    res.json(data)
  } catch (err) {
    res.status(500)
  }
})

app.listen(5000)
