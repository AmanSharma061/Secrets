import express, { response } from 'express'
import connectTodatabase from '../database/connection.js'
import Secret from '../database/models/secretsModel.js'
import User from '../database/models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import Otp from '../database/models/otpModel.js'
const resetTokens = {}
const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello')
})
const checker = async (req, res, next) => {
  await connectTodatabase()
  const data = await req.body
  const id = data.user
  try {
    const user = await User.findById(id)
  } catch (err) {
    console.log(err)
  }
  next()
}
const mailer = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'amansharmara112@gmail.com',
      pass: process.env.password
    }
  })
  const mailOptions = {
    from: 'amansharmara112@gmail.com',
    to: email,
    subject: 'Reset Your SafeKey.io password',
    text: `Your OTP is ${otp}`
  }
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error)
    } else {
      const existingUser = await Otp.findOne({ email })
      if (existingUser) {
        existingUser.updateOne({ otp: otp.toString() })
      } else {
        const Existing = await otp.findOne({ email })
        if (Existing.used === true) {
          await Otp.findOneAndUpdate(
            { email },
            { otp: otp.toString(), used: false }
          )
        } else {
          await Otp.create({ otp: otp.toString(), email: email })
          Existing.used = true
        }
        console.log('Email sent: ' + info.response)

        return info.response
      }
    }
  })
}

router.post('/api/forgot-password', async (req, res) => {
  const data = await req.body

  const email = data.email

  const user = await User.findOne({ email })
  if (!user) {
    res.status(422).json({ error: 'User does not exist' })
  } else {
    const otp = crypto.randomBytes(3).toString('hex')

    mailer(email, otp)

    res.status(200).json({ message: 'OTP sent successfully' })
  }
})
router.post('/api/reset-password', async (req, res) => {
  const data = await req.body
  const { email, otp, password, cpassword } = data
  const user = await Otp.findOne({ email })

  if (!user) {
    res.status(422).json({ error: 'Invalid OTP' })
  } else {
    if (password !== cpassword) {
      res.status(422).json({ error: 'Passwords do not match' })
    } else {
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword, cpassword: hashedPassword, used: true }
      )
      res.status(200).json({ message: 'Password reset successfully' })
    }
  }
})

router.post('/api/secrets/post', checker, async (req, res) => {
  await connectTodatabase()
  const data = await req.body

  try {
    const id = data.user
    let user = await User.findById(id)

    if (user.secretsCount >= 1) {
      return res.status(422).json({ error: 'You have exceeded the limit' })
    }
    const secret = new Secret({
      secret: data.secret,
      name: data.name,
      nameVisible: data.isPublic,
      user: id
    })

    const aaa = await secret.save()
    await user.save()

    if (user.secretsCount === 0) {
      user = await User.findByIdAndUpdate(id, { secretsCount: 1 })
    } else {
      user = await User.findByIdAndUpdate(id, { secretsCount: 0 })
    }
    await user.save()

    // await Secret.create(data.secrets)
    if (!aaa) return res.status(422).json({ error: 'Secrets not posted' })
    res.status(200).json({ message: 'Secrets posted successfully' })
  } catch (error) {
    console.log(error)
  }
})

router.get('/api/secrets/get', async (req, res) => {
  try {
    const secrets = await Secret.find()
    if (!secrets) return res.status(422).json({ error: 'No secrets found' })
    else {
      res.status(200).json({ secrets, message: 'Secrets fetched successfully' })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/api/secrets/signup', async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body

    if (!name || !email || !password || !cpassword)
      return res.status(422).json({ error: 'Please add all the fields' })

    if (password !== cpassword)
      return res.status(422).json({ error: 'Passwords do not match' })

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      cpassword: hashedPassword
    })
    await user.save()
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    )

    res.json({ message: 'Successfully posted', tkn: token })
  } catch (error) {
    console.log(error)
  }
})

router.post('/api/secrets/login', async (req, res) => {
  const { email, password } = req.body
  await connectTodatabase()
  try {
    if (!email || !password)
      return res.status(422).json({ error: 'Please add email or password' })

    const user = await User.findOne({ email })
    if (!user) return res.status(422).json({ error: 'Invalid credentials' })

    const doMatch = await bcrypt.compare(password, user.password)

    const token = await user.generateAuthToken()

    if (doMatch) {
      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      })
      !res.json({ message: 'Successfully signed in', user: user })
    } else {
      return res.status(422).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
  }
})

export default router
