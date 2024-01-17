import mongoose from 'mongoose'

const googleUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  secretsCount: {
    type: Number,
    default: 0
  }
})

const GoogleUser = mongoose.model('googleUser', googleUserSchema)

export default GoogleUser
