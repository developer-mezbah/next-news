import Link from "next/link";

const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)
    if(res.ok){
      const categories = await res.json();
      return categories
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

const CategoryList = async () => {
    // console.log(categoriesData);
    const categoriesData = await getCategories();
  return (
    <div className="flex md:gap-3 mt-5 flex-wrap gap-1">
        {categoriesData && categoriesData.map(category => (
            <Link key={category.id} href={`/categories/${category.catName}`} className="text-dark bg-themeColor md:p-3 p-2 rounded-lg cursor-pointer">{category.catName}</Link>
        ))}
    </div>
  )
}

export default CategoryList