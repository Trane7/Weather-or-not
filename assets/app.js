

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const timeEL = document.getElementById('time')
const dateEl = document.getElementById('date')
const currentWeatherConditionEl = document.getElementById('current-weather-condition')
const timeZone = document.getElementById('time-zone')
const countryEL = document.getElementById('country')
const forecastEL = document.getElementById('weather-forecast')
const tempEL = document.getElementById('temp')

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const API_KEY = '24f9efd8440e18d85fdf4f69350c73a9'

setInterval(() => {
    const time = new Date()
    const month = time.getMonth()
    const date = time.getDate()
    const day = time.getDay()
    const hour = time.getHours()
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes()
    const ampm = hour >=12 ? 'PM' : 'AM'
    
    timeEL.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

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
    </div>`

   
}