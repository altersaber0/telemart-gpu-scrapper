import React from "react"
import { useState } from "react"
import "./Timer.css"

function Timer() {
  const [time, setTime] = useState({})

  // timer updates every 10 minutes
  setInterval(() => {
    const currentDate = new Date()
    let min = `0${9 - (currentDate.getMinutes() % 10)}`
    let sec = `${59 - (currentDate.getSeconds() % 60)}`
    if (sec.length === 1) {
      sec = `0${sec}`
    }
    setTime({ min, sec })
    if (min === "00" && sec === "00") {
      // clear localStorage to prevent displaying old data when page will reload
      localStorage.clear()
      document.location.reload()
    }
  }, 1000)
  return (
    <div className="timer-container">
      <div id="refresh">Обновление через</div>
      <span id="minutes">{time.min}</span> :<span id="seconds">{time.sec}</span>
    </div>
  )
}

export default Timer
