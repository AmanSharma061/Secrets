import mongoose from 'mongoose'

const secretSchema = new mongoose.Schema({
  secret: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  nameVisible: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
 type:String,
  required:true
  }
})

const Secret = mongoose.model('Secret', secretSchema)

export default Secret
