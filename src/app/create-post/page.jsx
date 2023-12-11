import CreatePostForm from '@/components/CreatePostForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

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