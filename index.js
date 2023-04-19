import { getFullDate, getTime } from "./data/utils.js"
import { setBackGround } from "./data/backgroundfetch.js"
import { onloadFetchCrypto } from "./data/cryptofetch.js"
import { geoSuccess, geoError, locationOptions, fetchWeather } from "./data/weatherfetch.js"
import { fetchTrumpQuote } from "./data/trumpquote.js"

function initLoad() {
    //set background
    setBackGround()
    onloadFetchCrypto()
    document.getElementById('current-date').textContent = getFullDate()
    getTime()
    //ACCUWEATHER
    /* navigator.geolocation.getCurrentPosition(geoSuccess, geoError, locationOptions) */
    //OPENWEATHER
    navigator.geolocation.getCurrentPosition(fetchWeather, geoError, locationOptions)
    fetchTrumpQuote()

    setTimeout(() => {
        document.getElementById('crypto-div').style.backgroundColor = '#00000040'
    }, 3000)
}

initLoad()
setInterval(()=> getTime(), 1000)

document.getElementById('crypto-div').onmouseover = () => document.getElementById('crypto-div').style.backgroundColor = '#000000a0'
document.getElementById('crypto-div').onmouseleave = () => document.getElementById('crypto-div').style.backgroundColor = '#00000040'

/* document.getElementById('weather-div').addEventListener('click', test) */

document.getElementById('info-btn').addEventListener('click', () => {
    document.getElementById('bigdiv').classList.toggle('blurred')
    document.getElementsByTagName('body')[0].classList.toggle('body-blurred')
    document.getElementById('info-modal').classList.toggle('show-modal')
})

document.addEventListener('keydown', function(e) {
    if(e.key == 'Escape'){
        if (document.getElementById('info-modal').classList.contains('show-modal')) {
            console.log('esc while open')
            document.getElementById('info-modal').classList.toggle('show-modal')
            document.getElementById('bigdiv').classList.toggle('blurred')
            document.getElementsByTagName('body')[0].classList.toggle('body-blurred')
        }
    }
})

function cryptoMouseOver() {
    document.getElementById('crypto-div').style.backgroundColor = '#000000a0'
}
function cryptoMouseLeave() {
    document.getElementById('crypto-div').style.backgroundColor = '00000040'
}