import express from 'express'
import connectTodatabase from './database/connection.js'
import router from './auth/route.js'
import cors from 'cors'

const app = new express()
app.use(cors())
app.use(express.json())
app.use(express.static(process.cwd() + '/dist'))
app.use(router)
const port = process.env.PORT || 3000
connectTodatabase()
app.listen(port, () => {
  console.log('Server is running on port 3000')
})
