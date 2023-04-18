import { coinsToFetch, currentCurrency } from "./coins.js"
export { updatePixelRatio, setBackGround, getFullDate, getTime, onloadFetchCrypto, getLocationWeather }

let dPR = window.devicePixelRatio
let backGroundUrl = ``
let backgroundAuthorString = ''
let coinHTML = ''

//////////////////////set background of Body////////////////////////
async function setBackGround() {
    backGroundUrl = await onloadFetchBg()
    document.body.style.backgroundImage = `url('${backGroundUrl}&dpr=${dPR}')`
    document.getElementById('author').innerHTML = backgroundAuthorString
}


/////////////////ONLOAD FETCH BG & place in LET/////////////////////////
async function onloadFetchBg() {
    const baseURL = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=landscapes,nature&topic=wallpapers'
    /* https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature */
    /* https://api.unsplash.com/photos/random?orientation=landscape&client_id=-_WaTkHs23f_trveYoqlgf_SW6cKHl1E8acgWHKLejE&query=nature */

    const fetchedData = await fetch(baseURL)
    const dataPromise = await fetchedData.json()
    backgroundAuthorString = `Photo by <a href='${dataPromise.user.links.html}' alt='${dataPromise.user.name}'s Unsplash profile page' target='_blank'>${dataPromise.user.name}</a> 
            on <a href='https://unsplash.com/?utm_source=personal-dashboard&utm_medium=referral' alt='link to Unsplash homepage' target='_blank'>Unsplash</a>`

    return dataPromise.urls.full
}

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

/////////////////Update device pixel ratio///////////////////////////////////
let remove = null

const updatePixelRatio = () => {
  if (remove != null) {
    remove()
  }
  let mqString = `(resolution: ${window.devicePixelRatio}dppx)`
  let media = matchMedia(mqString)
  media.addEventListener("change", updatePixelRatio)
  remove = function () {
    media.removeEventListener("change", updatePixelRatio)
  }
  dPR = window.devicePixelRatio
  if (backGroundUrl) {
    document.body.style.backgroundImage = `url('${backGroundUrl}&dpr=${dPR}')`
  }
}

////////GET FULL Date & time /////
function getFullDate(){
  const d = new Date()
  return d.toLocaleDateString("en-GB", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
}

function getTime() {
  const d = new Date()
  let fullTime = d.toLocaleString("en-GB", {timeStyle: "short"})

  document.getElementById('current-time').textContent = fullTime
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
      .then(res => {
        if(!res.ok) {
          throw Error("Weather data not available")
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        document.getElementById('weather-div').innerHTML = `
          <p class='weather-location'>${data.name}, ${data.sys.country}</p>
          <div class='clouds-temps'>
            <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>
            <p class='temp-text'>${Math.round(data.main.temp)}°</p>
          </div>
          <p class='weather-description'>${data.weather[0].description}</p>
          `
      })
      .catch(err => console.error(err))
  })
}


/* 
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
        .then(res => res.json())
        .then(data => console.log(data))
*/