export { fetchTrumpQuote }

async function fetchTrumpQuote() {
    const trumpDataJson = await fetch(`https://api.tronalddump.io/random/quote`)
    const trumpData = await trumpDataJson.json()

    document.getElementById('lowercenter').innerHTML = `
    <a href='${trumpData._links.self.href}' alt='source of quote' target='_blank'>
        <p class='quote'>" ${trumpData.value}" <br>
        <span class='signed'> – Mr. Donald J. Trump – &nbsp;<br>45th President of the USA</span>
        </p>
    </a>
    `
}