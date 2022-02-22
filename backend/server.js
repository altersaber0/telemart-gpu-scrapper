const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()

/*
при GET запросе прочитать файл data.json и отправить его (try на случай если он в процессе удаления/записи) или отправить код 500 (catch) (это обработается на фронте)
*/

app.get("/data", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("data.json"))
    res.json(data)
  } catch (err) {
    res.status(500)
  }
})

app.listen(5000)
