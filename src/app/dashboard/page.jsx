import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Posts from "@/components/Posts";



export const metadata = {
  title: 'Dashboard || Posts',
  description: 'Welcome to Coder Value city, your go-to destination for breaking news, insightful articles, and up-to-the-minute updates. This news portal project is designed to deliver a seamless and personalized news browsing experience for users of all interests.',
}
 

const getPosts = async (email) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const { posts } = await res.json();
    return posts;
  } catch (error) {
    return null;
  }
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!session) {
    redirect("/sign-in");
  }

  let posts = [];
  if (email) {
    posts = await getPosts(email);
  }
  return (
    <div>
      {posts && posts.length > 0 ?
        posts.map((post) => (
          <Posts
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.authorEmail}
            datapublished={post.createdAt}
            category={post.catName}
            links={post.links || []}
            thumbnail={post.imageUrl}
          />
        )) : <h2 className="py-6">No Posts to Display!!</h2>}
    </div>
  );
};

export default page;
