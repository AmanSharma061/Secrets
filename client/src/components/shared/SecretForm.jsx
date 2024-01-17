import React, { useState } from 'react'
import { set } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSecret } from '@/contexts/secretsContext'

export const fetchSecrets = async ({ setAllSecrets }) => {
  try {
    const res = await fetch('/api/secrets/get')

    const secrets = await res.json()

    setAllSecrets(secrets.secrets)
  } catch (err) {
    console.log(err)
  }
}
const SecretForm = () => {
  const { done, setDone } = useSecret()
  const [secrets, setSecrets] = useState({
    secret: '',
    name: '',
    isPublic: false

    // Added isPublic field for the checkbox
  })

  const navigate = useNavigate()
  const Usser = localStorage.getItem('token')
  let obj
  if (Usser) {
    obj = JSON.parse(Usser)
  }

  const final = {
    ...secrets,
    user: obj?.user?._id
  }

  const changeHandler = e => {
    setSecrets({ ...secrets, [e.target.name]: e.target.value })
  }

  const checkboxChangeHandler = e => {
    setSecrets({ ...secrets, isPublic: e.target.checked })
  }

  const submitHandler = async e => {
    e.preventDefault()

    if (!secrets.secret || (!secrets.name && secrets.isPublic))
      return toast.warn('Please fill in all required fields', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })

    try {
      if (obj === undefined) {
        return toast.warn('Please Login', {
          position: 'top-right',
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }

      const response = await fetch('/api/secrets/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(final)
      })

      const data = await response.json()

      if (data.error) {
        toast.error(data.error, {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setSecrets({ secret: '', name: '', isPublic: false })
        return
      } else {
        toast.success('Secret Posted', {
          position: 'top-right',
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        let x = true
        setDone(x)
        setSecrets({ secret: '', name: '', isPublic: false })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='col-span-1  lg:mr-4  my-2  '>
      <ToastContainer />
      <div className='sticky  sm:max-w-xl sm:mx-auto   top-10 py-20'>
        <div className='relative   py-4 bg-white shadow-lg border border-opacity-70 sm:rounded-3xl  px-6 '>
          <div className='max-w-md mx-auto'>
            <h1 className='font-Tektur font-semibold text-sm pt-4'>
              Release, Relieve, Remain Anonymous
            </h1>

            <div className='divide-y divide-gray-200 '>
              <div className='py-6 text-base leading-6  text-gray-700 sm:text-lg sm:leading-7 '>
                <div className='relative py-2'>
                  <img
                    src='./secrets.jpg'
                    alt='Unleash'
                    className='rounded-md'
                  />
                </div>
                <form className='grid gap-y-2' onSubmit={submitHandler}>
                  <textarea
                    id='secret'
                    name='secret'
                    rows='4'
                    value={secrets.secret}
                    placeholder='Share your secret...'
                    onChange={changeHandler}
                    className='w-full p-2 border border-gray-300 rounded-md  text-base outline-none'
                  />

                  {/* option name input */}
                  <input
                    id='name'
                    name='name'
                    type='text'
                    value={secrets.name}
                    placeholder='Your name'
                    autoComplete='off'
                    onChange={changeHandler}
                    className='w-full p-2 border border-gray-300 rounded-md  text-base outline-none'
                  />

                  {/* Checkbox for whether the user wants their name to be public or not */}
                  <div className='flex items-center'>
                    <input
                      id='isPublic'
                      name='isPublic'
                      type='checkbox'
                      checked={secrets.isPublic}
                      onChange={checkboxChangeHandler}
                      className='h-4 w-4 text-gray-700 focus:ring-gray-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='isPublic'
                      className='ml-2 block text-sm text-gray-500'
                    >
                      Make my name public
                    </label>
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900'
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecretForm
