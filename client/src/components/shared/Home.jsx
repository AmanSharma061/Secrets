import React, { useEffect } from 'react'
import SecretForm from './SecretForm'
import { FaUserMinus } from "react-icons/fa";
import Footer from './Footer'
import Card from './Card'
import { fetchSecrets } from './SecretForm'
import Navbar from './Navbar'
import { useSecret } from '../../contexts/secretsContext'
const Home = () => {
  const [allSecrets, setAllSecrets] = React.useState([])
  const { done, setDone } = useSecret()

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
      
        const res = await fetch('/api/secrets/get')

        const secrets = await res.json()
  

        setAllSecrets(secrets.secrets)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSecrets()
  }, [done])

  return (
    <>
      <Navbar />
      <div className='inset-x-0  top-0 -z-30 mx-auto w-full max-w-screen-md  border-gray-100 bg-white/80 py-2.5  md:top-6 md:rounded-3xl lg:max-w-screen-lg lg:px-2 px-4'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4  w-full  box-border   rounded-lg '>
          <div className='lg:col-span-2 md:col-span-1 sm:col-span-1  lg:mx-2   my-2 py-4   '>
            <h1 className='font-bold lg:text-2xl md:text-xl text-xl text-#fdbb2d] font-Tektur '>
              Unveiling Anonymous Stories
            </h1>
            <p className='text-xs text-gray-500 font-Tektur'>
              Share your secrets anonymously, and read what others have to say
            </p>

            <div className='grid lg:grid-cols-2  sm:grid-cols-2 px-2 md:grid-cols-1  gap-x-2  grid-cols-1  my-3  '>
              {allSecrets?.map((secret ,i)=> (
                <div
                  key={secret._id}
                  className=' max-w-md mx-auto my-2  w-full px-4 py-2 bg-white rounded-md shadow-md border  border-opacity-75'
                >
                  <div className='flex items-center justify-between '>
                    <div className='flex items-center '>
                      <img
                        src={`https://source.unsplash.com/random/800x800/?img=${i}`}
                        alt='Unleash'
                        className='rounded-full h-10 w-10'
                      />
                      <div className='ml-3'>
                        <p className='text-gray-600 text-sm font-medium flex items-center gap-x-1 capitalize'>
                          <span><FaUserMinus /></span> 
                          {secret.nameVisible==true ? secret.name : 'Anonymous'}
                        </p>
                        <p className='text-gray-400 text-xs font-normal'>
                          posted on {secret.createdAt.split('T').reverse()[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <p className='text-gray-600 text-sm'>{secret.secret}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SecretForm />
        </div>
      </div>
        <Footer />
    </>
  )
}

export default Home
