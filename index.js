import { setBackGround, updatePixelRatio, getFullDate, getTime, onloadFetchCrypto, getLocationWeather } from "./data/utils.js"

function initLoad() {
    //Check screen/pixel ratio
    updatePixelRatio()
    //set background
    setBackGround()
    onloadFetchCrypto()
    document.getElementById('current-date').textContent = getFullDate()
    getTime()
    getLocationWeather()
}



initLoad()
setInterval(()=> getTime(), 1000)