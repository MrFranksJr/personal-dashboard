import { getFullDate, getTime, hideShowInfoModal, hideShowOptionsModal } from "./data/utils.js"
import { setBackGround } from "./data/backgroundfetch.js"
import { getCoinList, onloadFetchCrypto } from "./data/cryptofetch.js"
import { geoSuccess, geoError, locationOptions, fetchWeather } from "./data/weatherfetch.js"
import { fetchTrumpQuote } from "./data/trumpquote.js"

async function initLoad() {
    await getCoinList()
    getTime()
    document.getElementById('current-date').textContent = getFullDate()
    //ACCUWEATHER
    /* navigator.geolocation.watchPosition(geoSuccess, geoError, locationOptions) */
    //OPENWEATHER
    navigator.geolocation.getCurrentPosition(fetchWeather, geoError, locationOptions)
    onloadFetchCrypto()
    fetchTrumpQuote()
    //set background
    setBackGround()

    setTimeout(() => {
        document.getElementById('crypto-div').style.backgroundColor = '#00000040'
    }, 3000)
}
document.getElementById('crypto-div').onmouseover = () => document.getElementById('crypto-div').style.backgroundColor = '#000000a0'
document.getElementById('crypto-div').onmouseleave = () => document.getElementById('crypto-div').style.backgroundColor = '#00000040'

initLoad()
setInterval(()=> getTime(), 1000)

/* document.getElementById('weather-div').addEventListener('click', test) */

document.addEventListener('keydown', function(e) {
    if(e.key == 'Escape'){
        if (document.getElementById('info-modal').classList.contains('show-modal')) {
            hideShowInfoModal()
        } else if (document.getElementById('options-modal').classList.contains('show-modal')) {
            hideShowOptionsModal('close')
        }
    }
})

document.addEventListener('click', (e) => {
    if (document.getElementById('info-modal').classList.contains('show-modal')) {
        hideShowInfoModal()
    } else if (!document.getElementById('info-modal').classList.contains('show-modal') && e.target.id === 'info-button') {
        hideShowInfoModal()
    } else if (e.target.id === 'options-button' && !document.getElementById('options-modal').classList.contains('show-modal')) {
        hideShowOptionsModal('open')
    }
})

document.getElementById('close-options-modal').addEventListener('click', (e) => {
    hideShowOptionsModal('close')
})