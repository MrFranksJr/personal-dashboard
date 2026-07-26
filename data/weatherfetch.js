import {aCweatherAPI, openWeatherAPI} from "./data.js"

export { geoSuccess, geoError, locationOptions, fetchWeather, weatherCityId, loadCachedWeather }

let weatherCityId = ''

const locationOptions = {
  enableHighAccuracy: false, 
  timeout: 15000
}

function loadCachedWeather() {
  const lat = localStorage.getItem('last-lat')
  const lon = localStorage.getItem('last-lon')
  if (lat && lon) {
    console.log('reusing Location from memory')
    fetchWeather({ coords: { latitude: parseFloat(lat), longitude: parseFloat(lon) } }, true)
  }
}

////////////////////////OPEN WEATHER API //////////////////////////
async function fetchWeather(pos, isCached = false) {
  if (!isCached) {
    console.log('Need to fetch fresh location')
    localStorage.setItem('last-lat', pos.coords.latitude)
    localStorage.setItem('last-lon', pos.coords.longitude)
    localStorage.setItem('last-weather-time', Date.now().toString())
  }
  
  const unitsItem = localStorage.getItem('units')
  const units = unitsItem ? JSON.parse(unitsItem) : 'metric'
  
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=${units}&appid=${openWeatherAPI}`)
    const weatherData = await response.json()
    weatherCityId = `https://openweathermap.org/city/${weatherData.id}`

    const weatherDiv = document.getElementById('weather-div')
    if (weatherDiv) {
      weatherDiv.innerHTML = `
          <p class='weather-location'>${weatherData.name}, ${weatherData.sys.country}</p>
          <div class='image-temps'>
            <img class='weather-img' src='https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png' alt='${weatherData.weather[0].description}'>
            <p class='temp-text'>${Math.round(weatherData.main.temp)}°</p>
          </div>
          <p class='weather-description'>${weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</p>
          `
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
  }
}

////////////////////////locationKEY + ACCUWEATHER //////////////////////////
async function geoSuccess(pos) {
  try {
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

    const weatherDiv = document.getElementById('weather-div')
    if (weatherDiv) {
      weatherDiv.innerHTML = `
          <p class='weather-location'>${filteredData.locationName}, ${filteredData.countryId}</p>
          <div class='image-temps'>
            <img src='/images/${fetchedWeatherData[0].WeatherIcon}-s.png' alt='weather icon'>
            <p class='temp-text'>${Math.round(fetchedWeatherData[0].Temperature.Metric.Value)}°</p>
          </div>
          <p class='weather-description'>${fetchedWeatherData[0].WeatherText}</p>
          `
    }
  } catch (error) {
    console.error('Error fetching AccuWeather:', error)
  }
}
  
async function geoError(err) {
    console.error(`ERROR (${err.code}): ${err.message}`)
    const weatherDiv = document.getElementById('weather-div')
    if (weatherDiv) {
      weatherDiv.innerHTML = `
        <p class='weather-location'></p>
        <div class='image-temps'>
          <img class='weather-img-none' src='/images/no-location.svg' alt='cannot find location'>
          <p class='temp-text'></p>
        </div>
        <p class='weather-description'>Location unavailable<br><br>Try again later<br>Or check your browser's<br>privacy or security settings.</p>
      `
    }
}