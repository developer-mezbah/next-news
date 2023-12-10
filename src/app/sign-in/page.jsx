import SignInBtns from '@/components/SignInBtns'
import React from 'react'

const signIn = () => {
  return (
    <div>
        <h1>Welcome</h1>
        <p className='text-gray-400'>Lets sign you up quickly</p>
        <SignInBtns/>
    </div>
  )
}

export default signIn