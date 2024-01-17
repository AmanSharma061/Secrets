import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSecret } from '@/contexts/secretsContext'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { EMAIL } = useSecret()
  const [email, setEmail] = useState(EMAIL)

  const [ otp, setOtp ] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  const handleResetPassword = async () => {
    try {
      if (!email || !otp || !cpassword || !password) {
        toast.error('All fields are required', {
          position: 'top-center',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true
        })
        return
      }

      if (password !== cpassword) {
        toast.error('Passwords do not match')
        return
      }

      const response = await axios.post('/api/reset-password', {
        email,
        otp,
        password,
        cpassword
      })

      toast.success(response.data.message, {
        position: 'top-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
      })
      return navigate('/auth/login')
    } catch (error) {
      toast.error('Error resetting password', {
        position: 'top-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
      })
      console.error(error)
    }
  }

  return (
    <div className='container mx-auto mt-8 p-8 bg-gray-100 max-w-md'>
      <h2 className='text-2xl font-bold mb-4'>Reset Password</h2>

      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          otp:
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='text'
          value={otp}
          onChange={e => setOtp(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          New Password:
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Confirm Password:
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='password'
          value={cpassword}
          onChange={e => setCpassword(e.target.value)}
        />
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={handleResetPassword}
      >
        Reset Password
      </button>
      <ToastContainer position='bottom-right' autoClose={5000} />
    </div>
  )
}

export default ResetPassword
