import { aCweatherAPI, openWeatherAPI } from "./data.js"
export { geoSuccess, geoError, locationOptions, fetchWeather }

const locationOptions = {
  enableHighAccuracy: false, 
  /* timeout: 20000,  */
  maximumAge: 0
}

////////////////////////OPEN WEATHER API //////////////////////////
async function fetchWeather(pos) {
  console.log(pos.coords)
  const weatherDataJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${openWeatherAPI}`)
  const weatherData = await weatherDataJson.json()

  document.getElementById('weather-div').innerHTML = `
          <p class='weather-location'>${weatherData.name}, ${weatherData.sys.country}</p>
          <div class='image-temps'>
            <img class='weather-img' src='http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png' alt='${weatherData.weather[0].description}'>
            <p class='temp-text'>${Math.round(weatherData.main.temp)}°</p>
          </div>
          <p class='weather-description'>${weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</p>
          `
}

////////////////////////locationKEY + ACCUWEATHER //////////////////////////
async function geoSuccess(pos) {
  console.log('runs')
  const fetchedLocationJson = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${aCweatherAPI}&q=${pos.coords.latitude},${pos.coords.longitude}`)
  const fetchedLocationData = await fetchedLocationJson.json()

  const filteredData = {
    locationKey: fetchedLocationData.ParentCity.Key,
    locationName: fetchedLocationData.ParentCity.LocalizedName,
    countryName: fetchedLocationData.Country.LocalizedName,
    countryId: fetchedLocationData.Country.ID
  }

  const fetchedWeatherJson = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${filteredData.locationKey}?apikey=${aCweatherAPI}`)
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
  
function geoError(err) {
    console.error(`ERROR(${err.code}): ${err.message}`)
}