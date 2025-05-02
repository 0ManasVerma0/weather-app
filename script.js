document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const weatherBtn = document.getElementById("get-weather-btn");
    const errorMsg = document.getElementById("error-message");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperaturInfo = document.getElementById("temperature");
    const descriptionInfo = document.getElementById("description");

    const API_KEY = "d8f55ecc953e01d01909c1055fe63066";

    weatherBtn.addEventListener("click", async () => {
        const inputData = cityInput.value.trim();
        if(!inputData) return;

        try {
            const weatherData = await fetchWeatherData(inputData);
            fetchDisplay(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city){
        //gets data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url);
        console.log("RESPONSE",response)

        if(!response.ok) {
            throw new Error("City not found")  
        }
        const data = await response.json();
        return data;
    }

    function fetchDisplay(data){
        console.log(data);
        const {name, main, weather} = data;
        cityName.textContent = name;
        temperaturInfo.textContent = `Temperature : ${main.temp} °C`;;
        descriptionInfo.textContent = `Weather : ${weather[0].description}`; 

        //Unlocks display
        weatherInfo.classList.remove("hidden");
        errorMsg.classList.add("hidden");
    }

    function showError(){
        weatherInfo.classList.remove("hidden");
        errorMsg.classList.add("hidden")
    }
})