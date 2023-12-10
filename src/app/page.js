import CategoryList from "@/components/CategoryList";
import Posts from "@/components/Posts";

const Home = () => {
  return (
    <div className="">
      <span>
        <hr className="w-[40px] h-[5px] bg-themeColor border-0 ml-4 rounded-lg"/>
        <h3>Latest</h3>
      </span>
      <CategoryList />
      <Posts />
    </div>
  );
};

export default Home;
