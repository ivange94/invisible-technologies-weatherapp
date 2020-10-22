export const weather_api_url = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = ({ name, postalCode }) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&zip=${postalCode}&appid=877118737bc0f576d3add0c2f311478f&units=metric`)
        .then(response => response.json())
}