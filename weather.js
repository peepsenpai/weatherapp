// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 3760ab6f4fcfa6d53c3c1c401141e037

const weatherApi = {
    key: "3760ab6f4fcfa6d53c3c1c401141e037",
    apiUrl: "https://api.openweathermap.org/data/2.5/weather"
}


const userInput = document.getElementById('user-input');
const button = document.getElementById('search-btn');


button.addEventListener('click', ()=> {
    let requireMsg = document.getElementById('requireMsg');
    if (userInput.value != "") {
        weatherReport(userInput.value);
        setTimeout(() => {
            let content = document.getElementById('content')
            content.classList.add('active')
        }, 1000);
        requireMsg.classList.remove('active');
    }else{
        requireMsg.classList.add('active');
    }
})



// get weather 
function weatherReport(city) {
    fetch(`${weatherApi.apiUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then((weather) => {
            return weather.json();
        }).then(showWeather)
}

// show weather 
function showWeather(weather) {

    const errormsg = document.getElementById('errormsg');
    if (weather.cod == "404") {
        errormsg.classList.add('active')
        errormsg.innerText = `${userInput.value} - isn't a valid city`;
    }
    else {
        errormsg.classList.remove('active')
        let location = document.getElementById('location')
        location.innerText = `${weather.name}, ${weather.sys.country}`

        let date = document.getElementById('date')
        let currentDate = new Date()
        date.innerText = getdate(currentDate);
        function getdate(currentDate) {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Thrusday', 'Friday', 'Saturday'];
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec']
            let year = currentDate.getFullYear();
            let month = months[currentDate.getMonth()];
            let mainDate = currentDate.getDate();
            let day = days[currentDate.getDay()]
            return `${month} ${mainDate} (${day}) , ${year}`
        }


        let temp = document.getElementById('temp')
        temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`
        let minMaxTemp = document.getElementById('min-max-temp');
        minMaxTemp.innerHTML = `Max: ${Math.round(weather.main.temp_max)}&deg;C --  Min: ${weather.main.temp_min}&deg;C`

        let humidity = document.getElementById('humidity');
        humidity.innerText = `Humidity : ${weather.main.humidity}`

        let timezone = document.getElementById('timezone')
        timezone.innerText = `TimeZone : ${weather.timezone}`

        let windFlow = document.getElementById('wind-flow')
        windFlow.innerText = `Wind Blowing in ${weather.wind.deg} degree at ${weather.wind.speed} m/h`

        let weatherCondition = document.getElementById('weather-condition')
        weatherCondition.innerText = `${weather.weather[0].main}`

        // img sec 
        let weatherBox = document.getElementById('weatherBox');
        let weatherIcon = weatherBox.querySelector('img');
        let id = weather.weather[0].id
        if (id == 800){
            weatherIcon.src = "img/sunny.png"
        }
        else if(id>= 701 && id<= 781) {
            weatherIcon.src = "img/haze.png"
        }
        else if(id>=801 && id<=804){
            weatherIcon.src = "img/clooudy.png"
        }
        else if(id>=600 && id<=622){
            weatherIcon.src = "img/snow.png"
        }
        else if((id>=500 && id<=531)||(id>=300 && id<= 321)){
            weatherIcon.src = "img/rainy.png"
        }
        else if(id>=200 && id<=232){
            weatherIcon.src = "img/thunder.png"
        }

    }
}
