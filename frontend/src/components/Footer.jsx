import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo2} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>YourHealth simplifies connecting with healthcare professionals, offering easy appointment booking and specialist discovery. Bridging the gap between patients and doctors, it ensures timely and efficient healthcare access.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 8985693065</li>
            <li>Email: <a href="mailto:docconnectbusiness@gmail.com" target="_blank" rel="noopener noreferrer">docconnectbusiness@gmail.com</a></li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ docconnect.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
