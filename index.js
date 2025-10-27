import { getFullDate, getTime, hideShowInfoModal, hideShowOptionsModal } from "./data/utils.js"
import { setBackGround } from "./data/backgroundfetch.js"
import { getCoinList, fetchCrypto } from "./data/cryptofetch.js"
import { geoSuccess, geoError, locationOptions, fetchWeather, weatherCityId } from "./data/weatherfetch.js"
import { fetchTrumpQuote } from "./data/trumpquote.js"
import { setupMemory } from "./data/setupmemory.js"

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

// Crypto div hover effects
const cryptoDiv = document.getElementById('crypto-div')
cryptoDiv.onmouseover = () => cryptoDiv.style.backgroundColor = '#000000a0'
cryptoDiv.onmouseleave = () => cryptoDiv.style.backgroundColor = '#00000040'

// Initialize and start timer
init()
setInterval(getTime, 1000)

// Event handlers
document.getElementById('weather-div').addEventListener('click', () => {
    if (weatherCityId) window.open(weatherCityId, "_blank")
})

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return
    
    const infoModal = document.getElementById('info-modal')
    const optionsModal = document.getElementById('options-modal')
    
    if (infoModal.classList.contains('show-modal')) {
        hideShowInfoModal()
    } else if (optionsModal.classList.contains('show-modal')) {
        hideShowOptionsModal('close')
    }
})

document.addEventListener('click', e => {
    const infoModal = document.getElementById('info-modal')
    const showingInfo = infoModal.classList.contains('show-modal')
    
    if (showingInfo) {
        hideShowInfoModal()
    } else if (!showingInfo && e.target.id === 'info-button') {
        hideShowInfoModal()
    } else if (e.target.id === 'options-button' && !document.getElementById('options-modal').classList.contains('show-modal')) {
        hideShowOptionsModal('open')
    }
})

document.getElementById('close-options-modal').addEventListener('click', () => hideShowOptionsModal('close'))

document.getElementById('save-setting-btn').addEventListener('click', () => {
    const settings = {
        'crypto-assets': $('#crypto-list').val(),
        'vs_currency': document.getElementById('currency-list').value,
        'units': document.getElementById('measurement-list').value
    }

    // Save settings to localStorage
    Object.entries(settings).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value))
    })

    // Update displays
    fetchCrypto(JSON.parse(localStorage.getItem('crypto-assets')), JSON.parse(localStorage.getItem('vs_currency')))
    navigator.geolocation.getCurrentPosition(fetchWeather, geoError, locationOptions)

    // Show confirmation message
    const savedMsg = document.getElementById('settings-saved')
    savedMsg.style.transform = 'translateY(0px)'
    setTimeout(() => savedMsg.style.transform = 'translateY(10px)', 2000)
    setTimeout(() => savedMsg.style.transform = 'translateY(-150px)', 2200)
})
