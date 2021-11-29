//API key - 24f9efd8440e18d85fdf4f69350c73a9

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


function pullInfo() {
    const newSearch = document.getElementById("cityInput")
    const cityName = document.getElementById("cityName")
    cityName.innerHTML = "--" + newSearch.value + "--"
}

fetch("https://api.openweathermap.org/data/2.5/forecast?q='+newSearch.value+'&appid=24f9efd8440e18d85fdf4f69350c73a9")
.then(response => response.json())
.then(data => {
    for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i+1) + "Low").innerHTML = "Low:" + Number(data.list[i].main.temp_min -272.71)
    }
    for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i+1) + "High").innerHTML = "High:" + Number(data.list[i].main.temp_max -273.98)
    }
        
    }
)