import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App/App"

import dataArray from "../src/data.json"

ReactDOM.render(
  <React.StrictMode>
    <App data={dataArray} />
  </React.StrictMode>,
  document.getElementById("root")
)
