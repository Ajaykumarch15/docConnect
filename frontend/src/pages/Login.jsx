import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { use } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const {backendUrl,token,setToken}=useContext(AppContext)
  const navigate=useNavigate()
  const [state,setState]=useState('Sign Up')

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')

  const onSubmitHandler=async(event)=>{
    event.preventDefault()

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {
          state==='Sign Up' && <div className='w-full '>
          <p>Full Name</p>
          <input type='text' onChange={(e)=>setName(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' value={name} required/>
        </div>
        }
        
        <div className='w-full '>
          <p>Email</p>
          <input type='email' onChange={(e)=>setEmail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' value={email} required/>
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input type='password' onChange={(e)=>setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' value={password} required/>
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
      {state==='Sign Up' ?
      <p> Already have  an account?<span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span> </p>
    :<p>create a new Account?<span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'> click here</span></p>}
      </div>
      
    </form>
  )
}

export default Login
