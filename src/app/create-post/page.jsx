import CreatePostForm from '@/components/CreatePostForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Create a Post || Mezbah Uddin',
  description: "I am a highly motivated and detail-oriented software engineer with a passion for creating efficient, scalable, and maintainable software solutions. With 2 years of experience in the field, I have a proven track record of delivering high-quality code within challenging deadlines. My expertise lies in MERN Stack and NEXT.JS, and I am well-versed in the entire software development life cycle. I excel in problem-solving and thrive in dynamic and collaborative team environments."
}

const createPost = async () => {
  const session = await getServerSession(authOptions)
  if(!session){
    redirect("/sign-in")
  }
  return (
    <div>
        <CreatePostForm/>
    </div>
  )
}

export default createPost