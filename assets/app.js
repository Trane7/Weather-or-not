const timeEL = document.getElementById('time')
const dateEl = document.getElementById('date')
const currentWeatherConditionEl = document.getElementById('current-weather-condition')
const timeZone = document.getElementById('time-zone')
const countryEL = document.getElementById('country')
const forecastEL = document.getElementById('weather-forecast')
const tempEL = document.getElementById('temp')
const locationForm = document.getElementById('location-form');

locationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("submittd form");
    const location = document.querySelector(".location-search").value;
    console.log(`location: ${location}`);
    timeZone.textContent = location;

    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${location},us&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`)
    .then(res =>{
        if(res.status > 200) {
            throw new Error('something went wrong')
        }
        
        return res.json()})
    .then(data => {
        const {lat, lon} = data.city.coord

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            
            console.log(data)
            showWeatherData(data)
            })
        })
});

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const API_KEY = '24f9efd8440e18d85fdf4f69350c73a9'

setInterval(() => {
    const time = new Date()
    // const month = time.getMonth()
    // const date = time.getDate()
    // const day = time.getDay()
    const hour = time.getHours()
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    let minutes = time.getMinutes().toString()
    if(minutes.length === 1) {
        minutes = "0" + minutes
    }
    const ampm = hour >=12 ? 'PM' : 'AM'
    
    timeEL.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = time.toLocaleDateString()

}, 1000)

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude } = success.coords

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            
        console.log(data)
        showWeatherData(data)
        })
    })
}

function showWeatherData (data){
    let {humidity, wind_speed, uvi} = data.current
    //timeZone.innerHTML = data.timeZone
    countryEL.innerHTML = data.lat + 'N ' + data.lon + 'E'

    currentWeatherConditionEl.innerHTML = 
    `<div class="weather-condition">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-condition">
        <div>Wind Speed</div>
        <div>${wind_speed} mph</div>
    </div>
    <div class="weather-condition">
        <div>UV Index</div>
        <div>${uvi}</div>
    </div>
    
    `

   let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
       if(idx == 0){
            tempEL.innerHTML = 
            `<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@5x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <div class="temp">High  ${day.temp.day}&#176; F</div>
                <div class="temp">Low  ${day.temp.night}&#176; F</div>
            </div>
            `
        
        
       }else {
           otherDayForecast += `
            <div class="weather-forecast-condition">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">High  ${day.temp.day}&#176; F</div>
                <div class="temp">Low  ${day.temp.night}&#176; F</div>
            </div>
           ` 
       }
   })

   forecastEL.innerHTML = otherDayForecast
}