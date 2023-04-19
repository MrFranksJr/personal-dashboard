import { coinsToFetch, currentCurrency } from "./coins.js"
export { onloadFetchCrypto }

let coinHTML = ''

/////////////////ONLOAD FETCH CRYPTO & place in LET/////////////////////////
function onloadFetchCrypto() {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&ids=${coinsToFetch}&order=market_cap_desc`)
      .then(res => {
          if (!res.ok) {
              throw Error(`Something went wrong: ${res.status} - ${res.statusText}`)
          }
          return res.json()
      })
      .then(data => {
        for (let cryptoCoin of data) {
          coinHTML = coinHTML + `
          <button class='coin-btn'>
            <img src="${cryptoCoin.image}" alt="icon for the ${cryptoCoin.name} asset" class='coin-icon'>
            <p>${cryptoCoin.name} (${cryptoCoin.symbol.toUpperCase()}) – €${cryptoCoin.current_price.toLocaleString("nl-BE")}</p>
          </button>
          <div class='coin-content'>
            <p class='crypto-info'>🇪🇺&nbsp;&nbsp;&nbsp;€ ${cryptoCoin.current_price.toLocaleString("nl-BE")}</p>
            <p class='crypto-info'>📈&nbsp;&nbsp;&nbsp;€ ${cryptoCoin.high_24h.toLocaleString("nl-BE")}</p>
            <p class='crypto-info'>📉&nbsp;&nbsp;&nbsp;€ ${cryptoCoin.low_24h.toLocaleString("nl-BE")}</p>
          </div>
          `
        }
        document.getElementById('crypto-div').innerHTML = coinHTML
      })
      .then(function() {
        const coinBtn = document.getElementsByClassName("coin-btn")
  
        for (let i = 0; i < coinBtn.length; i++) {
          coinBtn[i].addEventListener("click", function() {
           for (let contentDiv of document.getElementsByClassName('coin-content')) {
              if(contentDiv != this.nextElementSibling){
                if(contentDiv.style.maxHeight) {
                  contentDiv.previousElementSibling.classList.toggle("active")
                }
                contentDiv.style.maxHeight = null
              }
           }
  
            this.classList.toggle("active")
            if (this.nextElementSibling.style.maxHeight){
              this.nextElementSibling.style.maxHeight = null
            } else {
              this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px"
            } 
          })
        }
      })
      .catch(err => console.error(err))
  }