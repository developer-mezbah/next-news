import { CiLinkedin, CiTwitter, CiFacebook } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { FaShareSquare } from "react-icons/fa";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
// import { socials } from "@/utils/postsData";

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



const Posts = async ({
  title,
  content,
  author,
  datapublished,
  category,
  links,
  thumbnail,
  id,
}) => {
  const session = await getServerSession(authOptions);

  const isEditable = session && session?.user?.email === author;

  // Date formatting
  const date = new Date(datapublished);

  // const defaultFormat = date.toLocaleString();

  const options = { year: "numeric", month: "short", day: "numeric" };
  const customFormat = date.toLocaleString("en-US", options);

  const sideDate = customFormat.split(" ");
  const sideDateFormattor = sideDate[1].split(",")[0];
  return (
    <div className="overflow-hidden mt-5">
      {/* {
        socials.map((icon, i)=> {
          const link = links.includes(icon.name)
          console.log(icon.name);
          return(
            <span key={i}>{icon.icon}</span>
          )
        })
      } */}
      {/* <div className="post-item mt-5">
        <div className="flex md:flex-row-reverse gap-3">
          <div className="">
            <div className="lg:w-[80%]">
              <h2 className="title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
                unde?
              </h2>
              <div className="md:hidden flex flex-wrap justify-between items-center my-3 px-2 gap-2">
                <p className=" text-themeColor font-bold bg-themeGray py-1 px-2 rounded-md">27 May 2024</p>
                <p className=" text-themeColor font-bold bg-themeGray py-1 px-2 rounded-md">Mezbah Uddin <br /> <small className="text-right block">author</small></p>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center my-2 text-center">
                <Image src={"/logo.png"} width={500} height={500} alt="My logo" className="w-full"/>
                <div className="overflow-hidden flex md:rotate-90 my-3 px-4">
                  <button className="bg-green-500 px-3 py-2 active:scale-110 hover:scale-110 rounded-tl-lg rounded-bl-lg">
                    Edit
                  </button>
                  <button className="bg-red-500 px-3 py-2 active:scale-110 hover:scale-110 rounded-br-lg rounded-tr-lg">
                    Delete
                  </button>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam iure alias adipisci fugit porro architecto saepe ut
                praesentium provident quos quia, illo tenetur sed iste, facere,
                eos quibusdam modi sequi temporibus expedita dicta obcaecati ex?
                Amet, earum omnis fugiat asperiores vel vitae perspiciatis iusto
                dolores dolore error, numquam pariatur sapiente ad quia soluta
                molestias id nobis unde. Cumque molestiae nulla, accusamus
                corporis dolores libero minus adipisci laborum praesentium
                mollitia eius voluptatibus expedita aut odit temporibus, ipsum
                amet aperiam doloribus fuga labore optio neque placeat dicta
                debitis. Voluptatum amet suscipit tempore eos? Voluptate ipsa
                esse minus quibusdam architecto ad ipsam voluptas!{" "}
                <button className="text-themeColor hover:underline font-bold hover:scale-110">
                  <Link href={"#"}>...ReadMore</Link>
                </button>
              </p>

              <div className="flex flex-wrap gap-3 text-textColor mt-4 justify-between pr-3 lg:pr-0">
                <div className="space-x-3">
                  <button className="border-2 border-themeColor rounded-md py-2 px-3">
                    AI
                  </button>
                  <button className="border-2 border-themeColor rounded-md py-2 px-3">
                    BNP
                  </button>
                </div>
              <div className="rounded-lg overflow-hidden flex">
                  <button className="bg-green-500 px-3 py-2 active:scale-110 hover:scale-110">
                    Edit
                  </button>
                  <button className="bg-red-500 px-3 py-2 active:scale-110 hover:scale-110">
                    Delete
                  </button>
                </div> 
                <div className="flex gap-3 flex-wrap">
                  <Link href={"#"} className="text-themeGray font-bold">
                    fasd
                  </Link>
                  <Link href={"#"} className="text-themeGray font-bold">
                    fasd
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100px] md:h-[250px] text-right mr-2 md:block relative hidden">
            <h1>27</h1>
            <h1>May</h1>
            <div className="-rotate-90 absolute -bottom-3 left-0 h-[100px] w-[200px]">
              <span>@Mezbah Uddin</span>
            </div>
          </div>
        </div>
      </div> */}

      <div className="post-item mt-10">
        <div className="flex md:flex-row-reverse gap-3">
          <div className="w-full">
            <div className="lg:w-[80%] space-y-7">
              <h2 className="title">{title}</h2>
              <div className="md:hidden flex flex-wrap justify-between items-center my-3 px-2 gap-2">
                <p className=" text-themeColor font-bold bg-themeGray py-1 px-2 rounded-md">
                  {customFormat}
                </p>
                <p className=" text-themeColor font-bold bg-themeGray py-1 px-2 rounded-md">
                  {author}
                  <br /> <small className="sm:text-right block">author</small>
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center my-2">
                {
                  <Image
                    src={thumbnail || "/no-image.jpeg"}
                    width={500}
                    height={500}
                    alt="My logo"
                    className="w-full object-cover rounded-lg lg:h-[300px]"
                  />
                }
                {isEditable && (
                  <div className="flex md:rotate-90 my-3 px-4 lg:m-auto">
                    <EditBtn id={id} />
                    <DeleteBtn id={id} />
                  </div>
                )}
              </div>
              <p>
                {/* truncate text */}
                {content.length > 400 ? (
                  <>
                    {content.slice(0, 400)}
                    <button className="text-themeColor hover:underline font-bold hover:scale-110">
                      <Link href={`/post-details/${id}`}>...ReadMore</Link>
                    </button>
                  </>
                ) : (
                  content
                )}
              </p>

              <div className="flex flex-wrap gap-3 text-textColor mt-4 justify-between pr-3 lg:pr-0">
                {category && (
                  <div className="space-x-3">
                    <Link href={`/categories/${category}`}>
                    <button className="border-2 border-themeColor rounded-md py-2 px-3">
                      {category}
                    </button>
                    </Link>
                  </div>
                )}
                <div className="flex gap-3 flex-wrap">
                  {links &&
                    links.map((link, i) => {
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
          <div className="w-[100px] md:h-[250px] text-right mr-2 md:block relative hidden">
            <h1>{sideDateFormattor}</h1>
            <h1>{sideDate[0]}</h1>
            <div className="-rotate-90 absolute -bottom-3 left-0 h-[100px] w-[200px]">
              <span className="font-bold">{author}</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-dark rounded-xl p-3 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {<div className="flex flex-col">
          <h3 className="text-warning text-center">
            Are you sure you want to <br /> delete this post!!!
          </h3>
          <div className="flex mt-3 justify-center gap-4 ite">
            <button className="text-textColor bg-themeColor py-2 px-3 rounded-lg">
              No
            </button>
            <button className="text-textColor bg-warning py-2 px-3 rounded-lg">
              Yes
            </button>
          </div>
        </div>} 
      </div>*/}
    </div>
  );
};

export default Posts;
