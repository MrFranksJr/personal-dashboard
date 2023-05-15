import { aCweatherAPI, openWeatherAPI, ipfyAPI } from "./data.js"
export { geoSuccess, geoError, locationOptions, fetchWeather }

let posLat = ''
let posLng = ''

const locationOptions = {
  enableHighAccuracy: false, 
  timeout: 10000,
  maximumAge: 0
}

////////////////////////OPEN WEATHER API //////////////////////////
async function fetchWeather(pos, identifier) {
  let weatherDataJson = ''
  let weatherData = ''
    if (identifier === 'backup') {
      console.log('backup weather request')
      posLat = pos.location.lat
    posLng = pos.location.lng
      weatherDataJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.location.lat}&lon=${pos.location.lng}&units=metric&appid=${openWeatherAPI}`)
      weatherData = await weatherDataJson.json()
    } else {
      console.log('primary weather request')
      posLat = pos.coords.lat
      posLng = pos.coords.lng
      weatherDataJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${openWeatherAPI}`)
      weatherData = await weatherDataJson.json()
    }

  document.getElementById('weather-div').innerHTML = `
          <p class='weather-location'>${weatherData.name}, ${weatherData.sys.country}</p>
          <div class='image-temps'>
            <img class='weather-img' src='https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png' alt='${weatherData.weather[0].description}'>
            <p class='temp-text'>${Math.round(weatherData.main.temp)}°</p>
          </div>
          <p class='weather-description'>${weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</p>
          `
}

////////////////////////locationKEY + ACCUWEATHER //////////////////////////
async function geoSuccess(pos) {
  const fetchedLocationJson = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${aCweatherAPI}&q=${pos.coords.latitude},${pos.coords.longitude}`)
  const fetchedLocationData = await fetchedLocationJson.json()

  const filteredData = {
    locationKey: fetchedLocationData.ParentCity.Key,
    locationName: fetchedLocationData.ParentCity.LocalizedName,
    countryName: fetchedLocationData.Country.LocalizedName,
    countryId: fetchedLocationData.Country.ID
  }

  const fetchedWeatherJson = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${filteredData.locationKey}?apikey=${aCweatherAPI}`)
  const fetchedWeatherData = await fetchedWeatherJson.json()

  document.getElementById('weather-div').innerHTML = `
          <p class='weather-location'>${filteredData.locationName}, ${filteredData.countryId}</p>
          <div class='image-temps'>
            <img src='/images/${fetchedWeatherData[0].WeatherIcon}-s.png'>
            <p class='temp-text'>${Math.round(fetchedWeatherData[0].Temperature.Metric.Value)}°</p>
          </div>
          <p class='weather-description'>${fetchedWeatherData[0].WeatherText}</p>
          `
}
  
async function geoError(err) {
    console.error(`ERROR (${err.code}): ${err.message}`)
    try {
      const fetchBackupLocation = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${ipfyAPI}`)
      const backUpLocationData = await fetchBackupLocation.json()

      fetchWeather(backUpLocationData, 'backup')
    } catch(error) {
        document.getElementById('weather-div').innerHTML = `
          <p class='weather-location'></p>
          <div class='image-temps'>
            <img class='weather-img-none' src='/images/no-location.svg' alt='cannot find location'>
            <p class='temp-text'></p>
          </div>
          <p class='weather-description'>Location unavailable<br>Check your browser's<br>privacy or security settings.</p>
          `
        console.error('ERROR: your location is unavailable! ' + error)
    }
}