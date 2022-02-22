const fs = require("fs")
const puppeteer = require("puppeteer")
const scrapeOneGPU = require("./scrapeOneGPU")


const URLs = JSON.parse(fs.readFileSync("URLs.json"))

async function scrapeAllGPUs(URLlist) {

    // launch browser single time
    const browser = await puppeteer.launch()

    const data = []
    for (let i = 0; i < URLlist.length; i++) {
        const currentItem = await scrapeOneGPU(browser, URLlist[i])
        data.push(currentItem)
    }

    await browser.close()

    // delete previous file "data.json" (or log out error and continue if it doesn't exist)
    try {
        fs.unlinkSync("data.json")
    } catch(err) {
        console.error(err)
    }
    
    // data -> json object + prettify
    const dataJson = JSON.stringify(data, null, 2)

    // create new file "data.json" and add current data ouput to it
    fs.writeFileSync("data.json", dataJson)
    
    return data
}

// scrapeAllGPUs(URLs).then((data) => {
//     console.log(data)
// })

setInterval(() => {
    scrapeAllGPUs(URLs).then((data) => {
        console.log(data)
    })
}, 600000)