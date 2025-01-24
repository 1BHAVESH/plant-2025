import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
        <Header />
        <div className='ml-10 mt-14 space-y-8'>
            <Link to="/new_plant"><p className='text-xl hover:text-green-800 cursor-pointer'>1{")"} New Plant</p></Link>
           <Link to="/my_plant"> <p className='text-xl hover:text-green-800 cursor-pointer'>2{")"} Edit Plant</p></Link>
           <Link to="/total-earnings"> <p className='text-xl hover:text-green-800 cursor-pointer'>2{")"}Earnings </p></Link>

        </div>
    </div>
  )

}

export default Admin