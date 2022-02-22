
async function scrapeOneGPU(browser, URL) {

    // creating new page
    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: "networkidle2" })

    // copying URL
    const link = URL

    // getting full name
    const name = await page.evaluate(() => {
        let name = document.querySelector("h1.b-page-title").innerText
        name = name.replace("Видеокарта ", "")
        return name
    })

    // getting availability status
    const availability = await page.evaluate(() => {
        const availability = document.querySelector("div.b-i-product-available").innerText
        return availability
    })

    // getting price (if it exists)
    const price = await page.evaluate(() => {
        try {
            const price = document.querySelector("div.b-pmi-col-left > div.b-price").innerText
            return price
        } catch(e) {
            return "0"
        }
    })

    // closing the page (to improve performance)
    await page.close()

    // return the object containing data
    return {
        link,
        name,
        availability,
        price
    }
}

module.exports = scrapeOneGPU