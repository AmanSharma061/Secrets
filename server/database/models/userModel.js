import mongoose, { mongo } from 'mongoose'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Secret'
  },
  secretsCount: {
    type: Number,
    default: 0
  },

  tokens: [
    {
      token: {
        type: String,
        default: null
      }
    }
  ]
})
userSchema.methods.generateAuthToken = async function () {
  let token = jwt.sign(
    {
      _id: this._id
    },
    process.env.SECRET_KEY
  )

  this.tokens = this.tokens.concat({ token: token })
  await this.save()
  return token
}
const User = mongoose.model('USER', userSchema)

export default User
