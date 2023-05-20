export { getCoinList, fetchCrypto }

let coinHTML = ''

/////////////////ONLOAD FETCH CRYPTO & place in LET/////////////////////////
function fetchCrypto(coinsToFetch, selectedCurrency, selectedUnit) {
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&ids=${coinsToFetch}&order=market_cap_desc`)
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
          <p>${cryptoCoin.name} (${cryptoCoin.symbol.toUpperCase()})&nbsp;&nbsp;&nbsp;<strong>€${cryptoCoin.current_price.toLocaleString("nl-BE")}</strong></p>
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

/////////////////Load Coinlist/////////////////////////
function getCoinList() {
let cryptoCollection = ''
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1`)
    .then(res => {
        if (!res.ok) {
            throw Error(`Something went wrong: ${res.status} - ${res.statusText}`)
        }
        return res.json()
    })
    .then(data => {
      console.log(data)
      for (let i=0; i < data.length; i++) {
        cryptoCollection = cryptoCollection + `<option value="${data[i].id}">${data[i].name} (${data[i].symbol.toUpperCase()})</option>`
      }
      document.getElementById('crypto-list').innerHTML = `
        ${cryptoCollection}
      `
      jQuery(function($) {
        $(".chosen-select").trigger("chosen:updated");
      })
      localStorage.setItem('crypto-list', JSON.stringify(cryptoCollection))
      localStorage.setItem('list-date', JSON.stringify(new Date()))
    })
}