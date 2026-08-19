import OpenAI from 'openai'
import { BASE_URL } from '../constants/index.js'

const ai = new OpenAI({
  baseURL: BASE_URL,
  apiKey: process.env.AICREDITS_API_KEY,
})

export { ai }
