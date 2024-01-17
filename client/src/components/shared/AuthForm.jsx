// AuthForm.js
import { LOGIN } from '@/lib/actions/signIn'
// import { GoogleLogin } from '@react-oauth/google'
import { postFormData } from '@/lib/actions/signUp'
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { handler } from 'tailwindcss-animate'
import axios from 'axios'

const AuthForm = () => {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  })

  const handleToggleForm = () => {
    setIsSignup(prev => !prev)
  }

  const handler = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const signUphandler = async e => {
    e.preventDefault()

    const res = await postFormData(formData)
    toast.success('Sign Up Successfull', {
      position: 'top-center',
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    })

    setFormData({
      name: '',
      email: '',
      password: '',
      cpassword: ''
    })

    const fun = setTimeout(() => {
      setIsSignup(prev => !prev)
    }, 800)
    fun()

    clearTimeout(fun)
  }

  const loginHandler = async e => {
    e.preventDefault()
    const res = await LOGIN(formData)

    if (res.error) {
      toast.error(res.error, {
        position: 'top-center',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
      })
    } else {
      toast.success('Login Successfull', {
        position: 'top-center',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
      })
      localStorage.setItem('token', JSON.stringify(res))
      const fun = setTimeout(() => {
        navigate('/')
      }, 800)
      fun()

      clearTimeout(fun)
    }
  }
  const loginSuccessHandler = async res => {
    const response = jwtDecode(res?.credential)
    const { email, name } = response

    const got = await axios.post('/api/auth/googleLogin', {
      email,
      name
    })
    if (got.data.message === 'Successfully signed in') {
      toast.success('Login Successfull', {
        position: 'top-center',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
      })
      localStorage.setItem('token', JSON.stringify(got.data))
      const fun = setTimeout(() => {
        navigate('/')
      }, 800)
      fun()
      clearTimeout(fun)
    }
  }

  return (
    <div className='min-h-full h-screen py-4 flex items-center justify-center bg-gray-900'>
      <ToastContainer />
      <div className='py-8 px-4 rounded-md shadow-md w-full max-w-md bg-gray-900 text-white'>
        <h2 className='text-2xl font-bold mb-4 text-white'>
          {' '}
          {isSignup ? (
            <>
              <Link to={'/'} className='underline'>
                Home
              </Link>
              <span className='no-underline'> / Sign Up</span>
            </>
          ) : (
            <>
              <Link to={'/'} className='underline'>
                Home
              </Link>
              <span className='no-underline'> / Log in</span>
            </>
          )}{' '}
        </h2>
        <form onSubmit={isSignup ? signUphandler : loginHandler}>
          {isSignup && (
            <div className='mb-4 text-white'>
              <label
                htmlFor='name'
                className='block text-white text-sm font-bold mb-2'
              >
                Name:
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handler}
                className='w-full p-2 border text-black border-gray-300 rounded-md '
                required
                autocomplete='off'
              />
            </div>
          )}

          <div className='mb-4 text-white'>
            <label
              htmlFor='email'
              className='block text-white text-sm font-bold mb-2'
            >
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handler}
              className='w-full p-2 border text-black border-gray-300 rounded-md'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-white text-sm font-bold mb-2'
            >
              Password:
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handler}
              className='w-full p-2 border text-black border-gray-300 rounded-md'
              required
            />
          </div>
          {!isSignup && (
            <div className='mb-4'>
              <Link to='/auth/forgot-password' className='text-blue-500'>
                forgot password
              </Link>
            </div>
          )}

          {isSignup && (
            <div className='mb-4'>
              <label
                htmlFor='cpassword'
                className='block text-white text-sm font-bold mb-2'
              >
                Confirm Password:
              </label>
              <input
                type='password'
                id='cpassword'
                value={formData.cpassword}
                onChange={handler}
                name='cpassword'
                className='w-full p-2 border text-black border-gray-300 rounded-md'
                required
              />
            </div>
          )}

          <button
            type='submit'
            className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-2'
          >
            {' '}
            {isSignup ? 'Sign Up' : 'Login'}{' '}
          </button>
        </form>
        <div className='w-full py-2 flex gap-x-4   text-black border-gray-300 rounded-md'>
          <GoogleLogin
           width={30}
            onSuccess={loginSuccessHandler}
            onError={() => {
              console.log('Login Failed')
            }}
          />
           <p className='my-auto text-gray-300 text-sm'>
          {' '}
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span
            className='ml-2 text-blue-500 cursor-pointer hover:underline'
            onClick={handleToggleForm}
          >
            {' '}
            {isSignup ? 'Login' : 'Sign Up'}{' '}
          </span>
        </p>
          </div>
    
       
      </div>
    </div>
  )
}

export default AuthForm
