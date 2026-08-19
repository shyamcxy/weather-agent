import { ai } from '../client/ai-client.js'
import { MODEL } from '../constants/index.js'
import { getWeatherTool } from '../tools/weather.tool-definition.js'
import { getWeather } from '../tools/weather.tool.js'

const invokeModel = async function ({
  messages,
  tools,
}: {
  tools?: any
  messages: any
}) {
  return ai.chat.completions.create({
    model: MODEL,
    messages,
    tools,
  })
}

async function researchAgent(question: string) {
  const messages: any = [{ role: 'user', content: question }]
  let count = 0
  while (true) {
    const response = await invokeModel({ messages, tools: [getWeatherTool] })
    console.log(
      'Invoke Model Response ',
      count++,
      JSON.stringify(response, null, 4)
    )
    if (!response.choices[0]?.message.tool_calls?.length) {
      return { message: response.choices[0]?.message }
    }

    const message = response.choices[0]?.message
    messages.push(message)

    message.tool_calls?.forEach((toolCall) => {
      const args = JSON.parse(toolCall.function.arguments)
      switch (toolCall.function.name) {
        case 'getWeather':
          const weatherData = getWeather(args.city)
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(weatherData),
          })
          break
        default:
          break
      }
    })
  }
}

export { researchAgent }
