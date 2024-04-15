import React from 'react'
import LikePoke from './LikePoke'

function FavPoke({fav}) {
  return (
    <div className='max-w-5xl mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
        {fav?.map((data, idx) => (
            <div key={idx}>
                <h3>{data?.name}</h3>
                <img src={data?.sprites?.other?.home?.front_default} alt={data?.name} />
                <LikePoke/>
            </div>
        ))}
    </div>
  )
}

export default FavPoke
