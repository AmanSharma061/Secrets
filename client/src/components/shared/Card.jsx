import React from 'react'
const Card = ({ allSecrets }) => {
  return (
    <div className=' '>
      {allSecrets?.map(secret => (
        <div
          key={secret._id}
          className=' max-w-md mx-auto my-2  w-full px-4 py-2 bg-white rounded-md shadow-md border  border-opacity-75'
        >
          <div className='flex items-center justify-between '>
            <div className='flex items-center '>
              <img
                src='./secrets.jpg'
                alt='Unleash'
                className='rounded-full h-10 w-10'
              />
              <div className='ml-3'>
                <p className='text-gray-800 text-sm font-medium'>
                  {secret.nameVisible ? secret.name : 'Anonymous'}
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
  )
}

export default Card
