import { getFullDate, getTime, hideShowInfoModal, hideShowOptionsModal } from "./data/utils.js"
import { setBackGround } from "./data/backgroundfetch.js"
import { getCoinList, fetchCrypto } from "./data/cryptofetch.js"
import { geoSuccess, geoError, locationOptions, fetchWeather, weatherCityId } from "./data/weatherfetch.js"
import { fetchTrumpQuote } from "./data/trumpquote.js"
import { setupMemory } from "./data/setupmemory.js"

///////////////////////////////////// INIT //////////////////////////////////////////////////
async function initLoad() {
    await getCoinList()
    getTime()
    document.getElementById('current-date').textContent = getFullDate()
    setupMemory()
    fetchTrumpQuote()
    setBackGround()
    setTimeout(() => {
        document.getElementById('crypto-div').style.backgroundColor = '#00000040'
    }, 3000)
}
document.getElementById('crypto-div').onmouseover = () => document.getElementById('crypto-div').style.backgroundColor = '#000000a0'
document.getElementById('crypto-div').onmouseleave = () => document.getElementById('crypto-div').style.backgroundColor = '#00000040'

initLoad()
setInterval(()=> getTime(), 1000)


/////////////////////////////////////EVENT LISTENERS//////////////////////////////////////////////////
document.getElementById('weather-div').addEventListener('click', () => {
    if (weatherCityId) {
        window.open(weatherCityId, "_blank");
    }
})

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

document.getElementById('save-setting-btn').addEventListener('click', (e) => {
    let selectedCurrencies = $('#crypto-list').val();
    let displayedCurrency = document.getElementById('currency-list').value
    let selectedUnits = document.getElementById('measurement-list').value

    localStorage.setItem('crypto-assets', JSON.stringify(selectedCurrencies))
    localStorage.setItem('vs_currency', JSON.stringify(displayedCurrency))
    localStorage.setItem('units', JSON.stringify(selectedUnits))

    fetchCrypto(JSON.parse(localStorage.getItem('crypto-assets')), JSON.parse(localStorage.getItem('vs_currency')))
    navigator.geolocation.getCurrentPosition(fetchWeather, geoError, locationOptions)

    document.getElementById('settings-saved').style.transform = 'translateY(0px)'
    setTimeout(() => {
        document.getElementById('settings-saved').style.transform = 'translateY(10px)'
    }, 2000);
    setTimeout(() => {
        document.getElementById('settings-saved').style.transform = 'translateY(-150px)'
    }, 2200);
})