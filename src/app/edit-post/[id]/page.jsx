import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditPostForm from "@/components/EditPostForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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
