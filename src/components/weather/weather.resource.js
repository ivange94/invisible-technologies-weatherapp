export const weather_api_url = "https://api.openweathermap.org/data/2.5/weather";

const appid = process.env.OPEN_WEATHER_API_KEY

export const getWeather = ({ name, postalCode }) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&zip=${postalCode}&appid=${appid}&units=metric`)
        .then(response => response.json())
}