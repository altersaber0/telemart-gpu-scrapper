import "./App.css"
import "../GpuComponent/GpuComponent"
import GpuComponent from "../GpuComponent/GpuComponent"
import Timer from "../TimerComponent/Timer"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

function App() {
  const data = []

  // adding State of the list
  const [finalData, setFinalData] = useState(data)

  // on page load: grab data from localStorage if it exists or make a request to the API and save response data to localStorage
  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      axios.get("http://localhost:5000/data").then((res) => {
        const responseData = res.data
        localStorage.setItem("data", JSON.stringify(responseData))
        const fullData = responseData.map((item) => {
          return { ...item, isVisible: true }
        })
        setFinalData(fullData)
      })
    } else {
      const data = JSON.parse(localStorage.getItem("data"))
      const fullData = data.map((item) => {
        return { ...item, isVisible: true }
      })
      setFinalData(fullData)
    }
  }, [])

  // getting user input in the Search form
  const searchQuery = useRef()

  function sortByPrice(event) {
    event.preventDefault()
    const copy = [...finalData]
    // sorting by price
    copy.sort((a, b) => {
      let first = parseInt(a.price)
      let second = parseInt(b.price)
      return first - second
    })
    // dividing items with non-zero price from zero price items to display them first
    const arrayWithNonZeroPrices = copy.filter((item) => {
      const price = parseInt(item.price)
      return price != 0
    })
    const arrayWithZeroPrices = copy.filter((item) => {
      const price = parseInt(item.price)
      return price == 0
    })
    const sortedArray = arrayWithNonZeroPrices.concat(arrayWithZeroPrices)
    setFinalData(sortedArray)
  }

  function sortByAvailability(event) {
    event.preventDefault()
    const copy = [...finalData]
    // displaying available items first
    const availableItems = copy.filter((item) => {
      return item.availability === "???????? ?? ??????????????"
    })
    const notAvailableItems = copy.filter((item) => {
      return item.availability === "?????? ?? ??????????????"
    })
    const sorted = availableItems.concat(notAvailableItems)
    setFinalData(sorted)
  }

  function searchByName(event) {
    event.preventDefault()
    const copy = [...finalData]
    // filtering data according to input
    const searchResults = copy.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(searchQuery.current.value.toLowerCase())
    })
    // setting (renewing) isVisible property of the correct results to true
    searchResults.forEach((item) => {
      item.isVisible = true
    })
    // filtering remained "wrong" results
    const reverseSearchResults = copy.filter((item) => {
      return !item.name
        .toLowerCase()
        .includes(searchQuery.current.value.toLowerCase())
    })
    // setting isVisible to false so they aren't rendered via map() later
    reverseSearchResults.forEach((item) => {
      item.isVisible = false
    })
    // correct results go first to be rendered
    const fullResults = searchResults.concat(reverseSearchResults)
    setFinalData(fullResults)
  }

  return (
    <div className="App">
      <h1 className="main-heading">Telemart GPU Status</h1>
      <Timer />
      <div className="wrapper">
        <div className="container">
          <div className="name-container label">
            ???????????????? ????????????
            <form onChange={searchByName}>
              <input
                type="text"
                ref={searchQuery}
                className="search-input"
                placeholder="??????????..."
              />
            </form>
          </div>
          <div className="price-container label">
            ????????
            <form onSubmit={sortByPrice}>
              <input
                type="submit"
                value="??????????????????????"
                className="sort-button"
              />
            </form>
          </div>
          <div className="availability-container label">
            ??????????????
            <form onSubmit={sortByAvailability}>
              <input
                type="submit"
                value="??????????????????????"
                className="sort-button"
              />
            </form>
          </div>
        </div>

        {finalData.map((item) => {
          if (!item.isVisible) return
          return <GpuComponent info={item} />
        })}
      </div>
    </div>
  )
}

export default App
