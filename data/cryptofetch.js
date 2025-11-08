export { getCoinList, fetchCrypto }

const cryptoDiv = document.getElementById('crypto-div')

/////////////////ONLOAD FETCH CRYPTO & place in LET/////////////////////////
function fetchCrypto(coinsToFetch, selectedCurrency, selectedUnit) {
  const currencyMap = {
    'eur': { symbol: '€', flag: '🇪🇺' },
    'usd': { symbol: '$', flag: '🇺🇸' },
    'jpy': { symbol: '¥', flag: '🇯🇵' }
  }
  
  const { symbol: currencySymbol, flag: currencyFlag } = currencyMap[selectedCurrency] || currencyMap.usd

  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&ids=${coinsToFetch}&order=market_cap_desc`)
    .then(res => {
        if (!res.ok) {
            throw Error(`Something went wrong: ${res.status} - ${res.statusText}`)
        }
        return res.json()
    })
    .then(data => {
      const fragment = document.createDocumentFragment()
      
      data.forEach(cryptoCoin => {
        const coinButton = document.createElement('button')
        coinButton.className = 'coin-btn'
        coinButton.innerHTML = `
          <img src="${cryptoCoin.image}" alt="icon for the ${cryptoCoin.name} asset" class='coin-icon'>
          <p>${cryptoCoin.name} (${cryptoCoin.symbol.toUpperCase()})&nbsp;&nbsp;&nbsp;<strong>${currencySymbol} ${cryptoCoin.current_price.toLocaleString("nl-BE")}</strong></p>
        `
        
        const coinContent = document.createElement('div')
        coinContent.className = 'coin-content'
        coinContent.innerHTML = `
          <p class='crypto-info'>${currencyFlag}&nbsp;&nbsp;&nbsp;${currencySymbol} ${cryptoCoin.current_price.toLocaleString("nl-BE")}</p>
          <p class='crypto-info'>📈&nbsp;&nbsp;&nbsp;${currencySymbol} ${cryptoCoin.high_24h.toLocaleString("nl-BE")}</p>
          <p class='crypto-info'>📉&nbsp;&nbsp;&nbsp;${currencySymbol} ${cryptoCoin.low_24h.toLocaleString("nl-BE")}</p>
        `
        
        fragment.appendChild(coinButton)
        fragment.appendChild(coinContent)
      })
      
      cryptoDiv.innerHTML = ''
      cryptoDiv.appendChild(fragment)
    })
    .then(() => {
      // Use event delegation instead of individual listeners
      cryptoDiv.addEventListener('click', handleCoinClick)
    })
    .catch(err => console.error(err))
}

function handleCoinClick(e) {
  if (!e.target.closest('.coin-btn')) return
  
  const button = e.target.closest('.coin-btn')
  const contentDivs = document.querySelectorAll('.coin-content')
  
  contentDivs.forEach(contentDiv => {
    if (contentDiv !== button.nextElementSibling && contentDiv.style.maxHeight) {
      contentDiv.previousElementSibling.classList.remove('active')
      contentDiv.style.maxHeight = null
    }
  })
  
  button.classList.toggle('active')
  const content = button.nextElementSibling
  content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px'
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