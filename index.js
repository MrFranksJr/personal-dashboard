import { getFullDate, getTime } from "./data/utils.js"
import { setBackGround } from "./data/backgroundfetch.js"
import { onloadFetchCrypto } from "./data/cryptofetch.js"
import { geoSuccess, geoError, locationOptions, fetchWeather } from "./data/weatherfetch.js"

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

    setTimeout(() => {
        document.getElementById('crypto-div').style.backgroundColor = '#00000040'
        document.getElementById('crypto-div').onmouseover = () => document.getElementById('crypto-div').style.backgroundColor = '#000000a0'
        document.getElementById('crypto-div').onmouseleave = () => document.getElementById('crypto-div').style.backgroundColor = '#00000040'
    }, 3000);
}

initLoad()
setInterval(()=> getTime(), 1000)