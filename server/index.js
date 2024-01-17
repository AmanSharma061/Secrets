import express from 'express'
import connectTodatabase from './database/connection.js'
import router from './auth/route.js'
const app = new express()
app.use(express.json())
app.use(router)

connectTodatabase()
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
