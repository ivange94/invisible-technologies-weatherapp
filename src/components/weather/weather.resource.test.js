import { getWeather } from './weather.resource'

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            main: {
                temp: 14
            },
            sys: {
                country: "US"
            },
            weather: [{
                description: "cloudy"
            }],
            name: "Portland"
        })
    })
)

const mockInputLocation = {
    name: "Portland",
    postalCode: 2005
}

const fetchInputUrl = "https://api.openweathermap.org/data/2.5/weather?q=Portland&zip=2005&appid=877118737bc0f576d3add0c2f311478f&units=metric"

test('it fetches weather data for given locations', async() => {
    const result = await getWeather(mockInputLocation)
    const { main: { temp }, sys: { country }, name, weather } = result
    const { description } = weather[0]

    expect(temp).toBe(14)
    expect(country).toBe('US')
    expect(description).toBe('cloudy')
    expect(name).toBe('Portland')
    expect(fetch).toHaveBeenCalledWith(fetchInputUrl)
})