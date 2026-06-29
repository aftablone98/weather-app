// Your OpenWeather API Key
const apiKey = "df3d63b36ebb4c4d0dc959d7df5354ca"; // Replace with your own API key

// Search button
const searchBtn = document.getElementById("search");

// Search when button is clicked
searchBtn.addEventListener("click", getWeather);

// Search when Enter key is pressed
document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        if (response.status === 404) {
            alert("City not found!");
            return;
        }

        // Display Weather Card
        document.querySelector(".weather-card").style.display = "block";

        // Weather Details
        document.getElementById("cityName").innerHTML =
            data.name + ", " + data.sys.country;

        document.getElementById("temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        document.getElementById("description").innerHTML =
            data.weather[0].description;

        document.getElementById("humidity").innerHTML =
            data.main.humidity + "%";

        document.getElementById("wind").innerHTML =
            data.wind.speed + " km/h";

        // Weather Icon
        const icon = data.weather[0].icon;

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${icon}@4x.png`;

        // Change Background
        changeBackground(data.weather[0].main);

    } catch (error) {

        console.log(error);

        alert("Something went wrong. Please try again.");

    }

}

// Change background according to weather
function changeBackground(weather) {

    switch (weather) {

        case "Clear":
            document.body.style.background =
                "linear-gradient(135deg,#56ccf2,#2f80ed)";
            break;

        case "Clouds":
            document.body.style.background =
                "linear-gradient(135deg,#bdc3c7,#2c3e50)";
            break;

        case "Rain":
        case "Drizzle":
            document.body.style.background =
                "linear-gradient(135deg,#4b79a1,#283e51)";
            break;

        case "Snow":
            document.body.style.background =
                "linear-gradient(135deg,#e6dada,#274046)";
            break;

        case "Thunderstorm":
            document.body.style.background =
                "linear-gradient(135deg,#232526,#414345)";
            break;

        case "Mist":
        case "Fog":
        case "Haze":
            document.body.style.background =
                "linear-gradient(135deg,#757F9A,#D7DDE8)";
            break;

        default:
            document.body.style.background =
                "linear-gradient(135deg,#4facfe,#00f2fe)";
    }
}