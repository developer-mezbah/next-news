import SignInBtns from '@/components/SignInBtns'
import React from 'react'
export const metadata = {
  title: 'Sign In || Mezbah Uddin',
  description: "I am a highly motivated and detail-oriented software engineer with a passion for creating efficient, scalable, and maintainable software solutions. With 2 years of experience in the field, I have a proven track record of delivering high-quality code within challenging deadlines. My expertise lies in MERN Stack and NEXT.JS, and I am well-versed in the entire software development life cycle. I excel in problem-solving and thrive in dynamic and collaborative team environments."
}

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