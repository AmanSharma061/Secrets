// AuthForm.js
import { LOGIN } from '@/lib/actions/signIn'
import { postFormData } from '@/lib/actions/signUp'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { handler } from 'tailwindcss-animate'

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

  const handleGoogleSignIn = () => {
    // Handle Google sign-in
    console.log('Google Sign In')
  }

  const handleGoogleSignUp = () => {
    // Handle Google sign-up
    console.log('Google Sign Up')
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
    const timeOut = setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        password: '',
        cpassword: ''
      })
      
      setIsSignup(prev => !prev)
    }, 1000)
    clearTimeout(timeOut)
    // clearTimeout(timeOut)
  }
  const loginHandler = async e => {
    e.preventDefault()
    const res = await LOGIN(formData)
    console.log(res)
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
      navigate('/')
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

        <div className='mt-4'>
          {' '}
          {!isSignup && (
            <button
              type='button'
              className='w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700'
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </button>
          )}
          {isSignup && (
            <button
              type='button'
              className='w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700'
              onClick={handleGoogleSignUp}
            >
              Sign Up with Google
            </button>
          )}{' '}
        </div>

        <p className='mt-4 text-gray-300 text-sm'>
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
  )
}

export default AuthForm
