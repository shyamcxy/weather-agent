import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources'
import { ai } from '../client/ai-client.js'
import { MODEL } from '../constants/index.js'
import { getWeatherTool } from '../tools/weather.tool-definition.js'
import { getWeather } from '../tools/weather.tool.js'

interface InvokeModelParams {
  messages: ChatCompletionMessageParam[]
  tools?: ChatCompletionTool[]
}

const invokeModel = async function ({ messages, tools }: InvokeModelParams) {
  return ai.chat.completions.create({
    model: MODEL,
    messages,
    tools,
  })
}

async function researchAgent(question: string) {
  const messages: ChatCompletionMessageParam[] = [
    { role: 'user', content: question },
  ]

  while (true) {
    const response = await invokeModel({ messages, tools: [getWeatherTool] })

    if (!response.choices[0]?.message.tool_calls?.length) {
      return { message: response.choices[0]?.message }
    }

    const message = response.choices[0]?.message
    messages.push(message)

    message.tool_calls?.forEach((toolCall) => {
      if (toolCall.type === 'function') {
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
      }
    })
  }
}

export { researchAgent }
