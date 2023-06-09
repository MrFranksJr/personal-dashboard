export { getCoinList, fetchCrypto }

/////////////////ONLOAD FETCH CRYPTO & place in LET/////////////////////////
function fetchCrypto(coinsToFetch, selectedCurrency, selectedUnit) {
  let coinHTML = ''
  let currencySymbol = ''
  let currencyFlag = ''
  if (selectedCurrency === 'eur') {
    currencySymbol = '€'
    currencyFlag = '🇪🇺'
  } else if (selectedCurrency === 'usd') {
    currencySymbol = '$'
    currencyFlag = '🇺🇸'
  } else if (selectedCurrency === 'jpy') {
    currencySymbol = '¥'
    currencyFlag = '🇯🇵'
  }

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
          <p>${cryptoCoin.name} (${cryptoCoin.symbol.toUpperCase()})&nbsp;&nbsp;&nbsp;<strong>${currencySymbol} ${cryptoCoin.current_price.toLocaleString("nl-BE")}</strong></p>
        </button>
        <div class='coin-content'>
          <p class='crypto-info'>${currencyFlag}&nbsp;&nbsp;&nbsp;${currencySymbol} ${cryptoCoin.current_price.toLocaleString("nl-BE")}</p>
          <p class='crypto-info'>📈&nbsp;&nbsp;&nbsp;${currencySymbol} ${cryptoCoin.high_24h.toLocaleString("nl-BE")}</p>
          <p class='crypto-info'>📉&nbsp;&nbsp;&nbsp;${currencySymbol} ${cryptoCoin.low_24h.toLocaleString("nl-BE")}</p>
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
  let memoryDate = new Date(JSON.parse(localStorage.getItem('list-date'))).getTime()
  let currentDate = new Date().getTime()
  let cryptoCollection = ''

  if (currentDate - memoryDate > 86400000) {
    console.log('Need to fetch fresh cryptolist')
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1`)
      .then(res => {
          if (!res.ok) {
              throw Error(`Something went wrong: ${res.status} - ${res.statusText}`)
          }
          return res.json()
      })
      .then(data => {
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
  } else {
    console.log('reusing Crypto from memory')
    document.getElementById('crypto-list').innerHTML = JSON.parse(localStorage.getItem('crypto-list'))
    jQuery(function($) {
      $(".chosen-select").trigger("chosen:updated");
    })
  }
}