import weatherData from '../data/weather-data.json' with { type: 'json' }

export interface Weather {
  city: string
  temperature: number
}

export function getWeather(city: string): Weather | string {
  const weather = weatherData.data.find(
    (item) => item.city.toLowerCase() === city.toLowerCase()
  )
  console.log({ weather })

  return weather ?? `Unable to get weather information for ${city}`
}
