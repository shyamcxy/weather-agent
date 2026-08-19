export const getWeatherTool = {
  type: 'function' as const,
  function: {
    name: 'getWeather',
    description: 'Get the current temperature for a city.',
    parameters: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
          description: 'The city to get the temperature for.',
        },
      },
      required: ['city'],
      additionalProperties: false,
    },
  },
}
