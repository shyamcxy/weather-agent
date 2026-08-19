import { Hono } from 'hono'
import { researchAgent } from '../agents/research-agent.js'

const researchRoutes = new Hono()

researchRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const result = await researchAgent(body.question)
    return c.json(result)
  } catch (error) {
    c.json({
      error,
    })
  }
})

export default researchRoutes
