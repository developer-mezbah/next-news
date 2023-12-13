import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Posts from "@/components/Posts";
// import { postsData } from '@/utils/postsData'

// const getPosts = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/`, {cache: "no-store"});
//     if (res.ok) {
//       const posts = res.json();
//       return posts;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

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

  // const postsData = await getPosts();
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
