import Posts from "@/components/Posts";

const getPosts = async (catName) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const categories = await res.json();
      const posts = categories;
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const CategoryPosts = async ({ params }) => {
  const category = params.catName;
  const posts = await getPosts(category);
  return (
    <>
      <div className="flex items-center gap-4">
        <h1>Category:-</h1>
        <h2> {category}</h2>
      </div>
      <div>
        {posts && posts.posts.length > 0 ? (
          posts.posts.map((post) => (
            <Posts
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.authorEmail}
              datapublished={post.createdAt}
              // category={post.catName}
              links={post.links || []}
              thumbnail={post.imageUrl}
            />
          ))
        ) : (
          <h2 className="py-6">No posts to display</h2>
        )}
      </div>
    </>
  );
};

export default CategoryPosts;
