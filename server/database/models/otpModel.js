import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  used: {
    type: Boolean,
    default: false
  }
})
const Otp = mongoose.model('otp', otpSchema)
export default Otp
// export default mongoose.model("otp", otpSchema);
