import Image from "next/image";
import Link from "next/link";
import { CiLinkedin, CiTwitter, CiFacebook } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";

const socials = [
    {
      name: "twitter",
      icon: <CiTwitter />,
    },
    {
      name: "facebook",
      icon: <CiFacebook />,
    },
    {
      name: "linkedin",
      icon: <CiLinkedin />,
    },
    {
      name: "github",
      icon: <FiGithub />,
    },
  ];


const getData = async (id) => {
  try {
    const data = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`);
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }) => {
  //   console.log(params.id);
  const post = await getData(params.id);

  // Date formatting
  const date = new Date(post.createdAt);
  // const defaultFormat = date.toLocaleString();
  const options = { year: "numeric", month: "short", day: "numeric" };
  const customFormat = date.toLocaleString("en-US", options);

  return (
    <div className="post-item my-5 pb-10">
      <div className="flex md:flex-row-reverse gap-3">
        <div className="">
          <div className="lg:w-[80%]">
            <h2 className="title">{post.title}</h2>
            <div className="flex flex-wrap justify-between items-center my-3 px-2 gap-2">
              <p className=" text-themeColor font-bold bg-themeGray py-1 px-2 rounded-md">
                {customFormat}
              </p>
              <p className=" text-themeColor font-bold bg-themeGray py-1 px-2 rounded-md">
                {post.authorEmail} <br />
                <small className="text-right block">Author</small>
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center my-2 text-center">
              <Image
                src={post.imageUrl}
                width={500}
                height={500}
                alt="My logo"
                className="w-full"
              />
            </div>
            <p className="pb-5">{post.content}</p>

            <div className="flex flex-wrap gap-3 text-textColor mt-4 justify-between pr-3 lg:pr-0 items-center">
              <div className="space-x-3 flex">
                <h2>Category Name: </h2>
                <button className="border-2 border-themeColor rounded-md py-2 px-3">
                  {post.catName}
                </button>
              </div>
              <div className="flex gap-3 flex-wrap items-center">
                <h2>Social Link: </h2>
                {/* <Link href={"#"} className="text-themeGray font-bold">
                  fasd
                </Link>
                <Link href={"#"} className="text-themeGray font-bold">
                  fasd
                </Link> */}

                {post.links &&
                  post.links.map((link, i) => {
                    return (
                      <>
                        <Link
                          key={i}
                          href={link}
                          className="text-themeGray font-bold"
                        >
                          {/* {link} */}
                          {socials.map((social, i) => (
                            <div
                              className="text-4xl cursor-pointer text-themeColor"
                              key={i}
                            >
                              {link.includes(social.name) && social.icon}
                            </div>
                          ))}
                        </Link>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
