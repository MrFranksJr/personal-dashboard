import { getFullDate, getTime, hideShowInfoModal, hideShowOptionsModal } from "./data/utils.js"
import { setBackGround } from "./data/backgroundfetch.js"
import { getCoinList, fetchCrypto } from "./data/cryptofetch.js"
import { geoSuccess, geoError, locationOptions, fetchWeather, weatherCityId } from "./data/weatherfetch.js"
import { fetchTrumpQuote } from "./data/trumpquote.js"
import { setupMemory } from "./data/setupmemory.js"

const bigDiv = document.getElementById('bigdiv')
const weatherDiv = document.getElementById('weather-div')
const infoModal = document.getElementById('info-modal')
const optionsModal = document.getElementById('options-modal')

// Initialize app
async function init() {
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

// Single event delegation handler
document.addEventListener('click', e => {
    const { target } = e
    const { id } = target
    
    // Weather click
    if (target === weatherDiv && weatherCityId) {
        window.open(weatherCityId, "_blank")
        return
    }
    
    // Modal handlers
    const showingInfo = infoModal.classList.contains('show-modal')
    const showingOptions = optionsModal.classList.contains('show-modal')
    
    if (id === 'info-button') {
        hideShowInfoModal()
    } else if (id === 'options-button' && !showingOptions) {
        hideShowOptionsModal('open')
    } else if (id === 'close-options-modal') {
        hideShowOptionsModal('close')
    } else if (id === 'save-setting-btn') {
        handleSaveSettings()
    } else if (showingInfo && !infoModal.contains(target)) {
        hideShowInfoModal()
    }
})

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return
    
    if (infoModal.classList.contains('show-modal')) {
        hideShowInfoModal()
    } else if (optionsModal.classList.contains('show-modal')) {
        hideShowOptionsModal('close')
    }
})

function handleSaveSettings() {
    const settings = {
        'crypto-assets': $('#crypto-list').val(),
        'vs_currency': document.getElementById('currency-list').value,
        'units': document.getElementById('measurement-list').value
    }

    Object.entries(settings).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value))
    })

    fetchCrypto(JSON.parse(localStorage.getItem('crypto-assets')), JSON.parse(localStorage.getItem('vs_currency')))
    navigator.geolocation.getCurrentPosition(fetchWeather, geoError, locationOptions)

    const savedMsg = document.getElementById('settings-saved')
    savedMsg.style.transform = 'translateY(0px)'
    setTimeout(() => savedMsg.style.transform = 'translateY(10px)', 2000)
    setTimeout(() => savedMsg.style.transform = 'translateY(-150px)', 2200)
}

init()
setInterval(getTime, 1000)
