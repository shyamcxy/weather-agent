import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import 'dotenv/config'
import researchRoutes from './routes/research.routes.js'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.route('/research', researchRoutes)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
