import { postsData } from "@/utils/postsData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Posts = () => {
  return (
    <div className="mt-5">
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

      {postsData &&
        postsData.map((post) => (
          <div key={post.id} className="post-item mt-5">
            <div className="flex md:flex-row-reverse gap-3">
              <div className="">
                <div className="lg:w-[80%]">
                  <h2 className="title">{post.title}</h2>
                  <div className="md:hidden flex flex-wrap justify-between items-center my-3 px-2 gap-2">
                    <p className=" text-themeColor font-bold bg-themeGray py-1 px-2 rounded-md">
                      {post.datapublished}
                    </p>
                    <p className=" text-themeColor font-bold bg-themeGray py-1 px-2 rounded-md">
                      {post.author}
                      <br /> <small className="text-right block">author</small>
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center my-2 text-center">
                    <Image
                      src={post.thumbnail}
                      width={500}
                      height={500}
                      alt="My logo"
                      className="w-full object-cover rounded-lg"
                    />
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
                    {post.content}
                    <button className="text-themeColor hover:underline font-bold hover:scale-110">
                      <Link href={"#"}>...ReadMore</Link>
                    </button>
                  </p>

                  <div className="flex flex-wrap gap-3 text-textColor mt-4 justify-between pr-3 lg:pr-0">
                    <div className="space-x-3">
                      {post &&
                        post.category.map((catItem, index) => (
                          <button
                            key={index}
                            className="border-2 border-themeColor rounded-md py-2 px-3"
                          >
                            {catItem}
                          </button>
                        ))}
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
          </div>
        ))}
    </div>
  );
};

export default Posts;
