import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })
const connectTodatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(`MongoDB connected`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectTodatabase
