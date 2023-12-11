
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await getServerSession(authOptions)
    if(!session){
      redirect("/sign-in")
    }
  return (
    <div>
        <h1>My posts</h1>
    </div>
  )
}

export default page