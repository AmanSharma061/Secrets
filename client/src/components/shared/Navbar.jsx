import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '../ui/button'
import AuthForm from './AuthForm'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const get = localStorage.getItem('token')

  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='bg-white  sticky  -top-2 py-1 lg:pt-4 md:pt-4 w-full h-fit z-40'>
      <header className='sticky inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-2.5 shadow backdrop-blur-lg md:top-6  md:rounded-3xl lg:max-w-screen-lg'>
        <div className='px-4'>
          <div className='flex items-center justify-between'>
            <div className='flex shrink-0'>
              <Link aria-current='page' className='flex items-center' to='/'>
                <img className='h-7 w-auto' src='./logo.png' alt='' />
                <p className='sr-only'>Website Title</p>
              </Link>
            </div>

            <div className='flex items-center justify-end gap-3'>
              <Link
                className='bg-gray-900 text-gray-100 px-4 py-2 text-xs rounded-2xl'
                to='/auth'
                onClick={get && logoutHandler  }
              >
                {get ? 'log out' : 'Login'}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
