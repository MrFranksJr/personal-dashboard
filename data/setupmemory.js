import { geoSuccess, geoError, locationOptions, fetchWeather } from "./weatherfetch.js"
import { fetchCrypto } from "./cryptofetch.js"
import { defaultCoins } from "./coins.js"
export { setupMemory }

function setupMemory() {
    if (localStorage.getItem('has-preferences')) {
        fetchCrypto(JSON.parse(localStorage.getItem('crypto-assets')), JSON.parse(localStorage.getItem('vs_currency')))
        navigator.geolocation.getCurrentPosition(fetchWeather, geoError, locationOptions)

        document.getElementById('currency-list').value = JSON.parse(localStorage.getItem('vs_currency'))
        document.getElementById('measurement-list').value = JSON.parse(localStorage.getItem('units'))
    } else {
         //load default coins
         localStorage.setItem('crypto-assets', JSON.stringify(defaultCoins))
         //set default to euros
         localStorage.setItem('vs_currency', JSON.stringify('eur'))
         //set default to metric
         localStorage.setItem('units', JSON.stringify('metric'))
         //set dropdown values
         document.getElementById('currency-list').value = JSON.parse(localStorage.getItem('vs_currency'))
         document.getElementById('measurement-list').value = JSON.parse(localStorage.getItem('units'))
         jQuery(function($) {
            $(".chosen-select").val('btc').trigger("chosen:updated");
          })
         //launch fetchCrypto function
         fetchCrypto(JSON.parse(localStorage.getItem('crypto-assets')), JSON.parse(localStorage.getItem('vs_currency')))

         localStorage.setItem('has-preferences', JSON.stringify('true'))
    }
}

//ACCUWEATHER
/* navigator.geolocation.watchPosition(geoSuccess, geoError, locationOptions) */
//OPENWEATHER