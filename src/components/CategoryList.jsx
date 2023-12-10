import { categoriesData } from "@/utils/postsData"
import Link from "next/link";


const CategoryList = () => {
    // console.log(categoriesData);
  return (
    <div className="flex md:gap-3 mt-5 flex-wrap gap-1">
        {categoriesData && categoriesData.map(category => (
            <Link key={category.id} href={`/categories/${category.name}`} className="text-dark bg-themeColor md:p-3 p-2 rounded-lg cursor-pointer">{category.name}</Link>
        ))}
    </div>
  )
}

export default CategoryList