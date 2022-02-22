import React from "react"
import "./GpuComponent.css"

function GpuComponent({ info }) {
  // handling 0 price
  let price = info.price
  if (info.price == 0) {
    price = "-"
  } else {
    price += " грн"
  }
  return (
    <div className="container">
      <div className="name-container">
        <a href={info.link} className="link">
          {info.name}
        </a>
      </div>
      <div className="price-container">{price}</div>
      <div className="availability-container">
        {info.availability === "Есть в наличии" && (
          <span className="availability-green">{info.availability}</span>
        )}
        {info.availability === "Нет в наличии" && (
          <span className="availability-red">{info.availability}</span>
        )}
      </div>
    </div>
  )
}

export default GpuComponent
