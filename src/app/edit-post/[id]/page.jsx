import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditPostForm from "@/components/EditPostForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
export const metadata = {
  title: 'Edit a Post || Mezbah Uddin',
  description: "I am a highly motivated and detail-oriented software engineer with a passion for creating efficient, scalable, and maintainable software solutions. With 2 years of experience in the field, I have a proven track record of delivering high-quality code within challenging deadlines. My expertise lies in MERN Stack and NEXT.JS, and I am well-versed in the entire software development life cycle. I excel in problem-solving and thrive in dynamic and collaborative team environments."
}

const getPost = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const post = await res.json();
      return post;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  // const email = session?.user?.email;

  if (!session) {
    redirect("/sign-in");
  }

  const id = params.id;
  const post = await getPost(id);
  return <>{post ? <EditPostForm post={post}/> : <h2>Invalid Post!!</h2>}</>;
};

export default page;
