import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=' inset-x-0  z-30 mx-auto w-full max-w-screen-md  bg-white/80 pt-2.5  backdrop-blur-md md:top-6    lg:max-w-screen-lg  '>
      <footer className='bg-gray-900 text-white py-8  lg:rounded-t-md lg:rounded-b-none md:rounded-2xl rounded-b-none'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <h1 className='text-3xl font-bold'>
              <img src='./logo.png' alt='logo' id='rr' className='h-10' />
            </h1>
          </div>

          <div className='flex mt-4 md:mt-0'>
            <Link to='#' className='mr-4 text-xl hover:text-gray-400'>
              <FaFacebook />
            </Link>
            <a to='#' className='mr-4 text-xl hover:text-gray-400'>
              <FaTwitter />
            </a>
            <a to='#' className='mr-4 text-xl hover:text-gray-400'>
              <FaInstagram />
            </a>
            <a to='#' className='text-xl hover:text-gray-400'>
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Additional Information */}
        <div className='mt-8 text-center'>
          <p className='text-sm'>
            &copy; 2024 SafeKey.io{' '}
            <span className='px-1'> All rights reserved.</span>
          </p>
          <p className='text-sm'>
            Developed with ❤️ by{' '}
            <Link
              to={'https://www.instagram.com/aman.sharma061'}
              target='_blank'
              className='underline-offset-auto'
            >
              Aman Sharma
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
