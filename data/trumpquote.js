export { fetchTrumpQuote }

async function fetchTrumpQuote() {
    const trumpDataJson = await fetch(`https://api.whatdoestrumpthink.com/api/v1/quotes/random`)
    const trumpData = await trumpDataJson.json()
    console.log(trumpData)

    document.getElementById('lowercenter').innerHTML = `
        <p class='quote'>" ${trumpData.message} "<br>
        <span class='signed'> – Mr. Donald J. Trump – &nbsp;<br><span class='trumpTitle'>45th & 47th President of the US</span></span>
        </p>
    `
}