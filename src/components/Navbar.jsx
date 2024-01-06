"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebouncedCallback } from "use-debounce";

const Navbar = () => {
  const { status, data } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchModel, setSearchModel] = useState(false);
  const [searchData, setSearchData] = useState([]);

  // DropDown hidden when click outside
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsPopupVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    if (!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisible]);
  // ref={popupRef} use in current DropDown div
  // Dropdown program End

  const handleSearch = useDebouncedCallback((e) => {
    fetch("/api/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.target.value), // Convert the data to JSON format
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchData(data);
      });
  }, 300);
  return (
    <>
      {searchModel && (
        <div className="searchModel bg-trasnparent h-screen w-screen fixed top-0 z-50 grid place-items-center">
          <div className="bg-slate-900 text-white md:h-[500px] md:w-[400px] w-[90%] h-[60%] p-5 rounded-md relative">
            <span
              onClick={() => {
                setSearchModel(!searchModel);
                setSearchData([]);
              }}
              className="text-red-500 text-4xl absolute rotate-45 top-[5px] left-[12px] cursor-pointer"
            >
              +
            </span>
            <div className="mt-10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className=" bg-white p-3 text-slate-900 border-themeColor rounded-lg outline-none w-4/5"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
                <button className="text-4xl text-center w-1/7 text-themeColor border-themeColor border-2 p-1 rounded-lg cursor-pointer">
                  <CiSearch />
                </button>
              </div>
            </div>
            <div>
              <ul className="mt-5 overflow-hidden ">
                {searchData &&
                  searchData.map((data) => (
                    <li
                      key={data.id}
                      className="mt-2"
                      onClick={() => {
                        setSearchModel(!searchModel);
                        setSearchData([]);
                      }}
                    >
                      <Link
                        href={`/post-details/${data.id}`}
                        className="underline text-xl hover:text-themeColor"
                      >
                        {data.title}
                      </Link>
                    </li>
                  ))}
                {searchData.length === 0 && <li className="text-center">Type on serach Box!...</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="bg-bodyColor lg:w-[10%] w-[100%] fixed lg:left-0 bottom-0 lg:border-r-2 border-themeColor lg:h-screen h-[90px] z-50">
        <nav className="flex lg:flex-col lg:w-full h-full text-center md:space-y-5 justify-between lg:justify-around items-center md:w-[80%] m-auto border-2 border-themeColor p-2 lg:border-0 rounded-md">
          <div className="logo">
            <Link href={"/"}>
              <Image
                src="/logo.png"
                width={500}
                height={500}
                alt="Created by Mezbah Uddin"
                className="md:w-[200px] md:h-[70px] lg:h-[50px] xl:h-[70px] w-[150px] md:pr-0 pr-4 h-[50px]"
              />
            </Link>
          </div>
          <ul className="lg:space-y-10 flex lg:flex-col md:gap-10 gap-5 items-center relative">
            <li
              onClick={() => setSearchModel(!searchModel)}
              className="cursor-pointer"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 40 40"
                  fill="none"
                  className="svg m-auto"
                >
                  <mask
                    id="mask0_17_195"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={40}
                    height={40}
                  >
                    <rect width={40} height={40} fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_17_195)">
                    <path d="M31.5 33.8333L22.1667 24.5C21.3333 25.1667 20.375 25.6944 19.2917 26.0833C18.2083 26.4722 17.0556 26.6667 15.8333 26.6667C12.8056 26.6667 10.2433 25.6183 8.14667 23.5217C6.04889 21.4239 5 18.8611 5 15.8333C5 12.8056 6.04889 10.2428 8.14667 8.145C10.2433 6.04833 12.8056 5 15.8333 5C18.8611 5 21.4239 6.04833 23.5217 8.145C25.6183 10.2428 26.6667 12.8056 26.6667 15.8333C26.6667 17.0556 26.4722 18.2083 26.0833 19.2917C25.6944 20.375 25.1667 21.3333 24.5 22.1667L33.875 31.5417C34.1806 31.8472 34.3333 32.2222 34.3333 32.6667C34.3333 33.1111 34.1667 33.5 33.8333 33.8333C33.5278 34.1389 33.1389 34.2917 32.6667 34.2917C32.1944 34.2917 31.8056 34.1389 31.5 33.8333ZM15.8333 23.3333C17.9167 23.3333 19.6878 22.6044 21.1467 21.1467C22.6044 19.6878 23.3333 17.9167 23.3333 15.8333C23.3333 13.75 22.6044 11.9789 21.1467 10.52C19.6878 9.06222 17.9167 8.33333 15.8333 8.33333C13.75 8.33333 11.9789 9.06222 10.52 10.52C9.06222 11.9789 8.33333 13.75 8.33333 15.8333C8.33333 17.9167 9.06222 19.6878 10.52 21.1467C11.9789 22.6044 13.75 23.3333 15.8333 23.3333Z" />
                  </g>
                </svg>
              </span>
              <span>Search</span>
            </li>
            {/* 
            <li>
            <Link href="#">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 40 40"
                  fill="none"
                  className="svg m-auto"
                >
                  <mask
                    id="mask0_2_99"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={40}
                    height={40}
                  >
                    <rect width={40} height={40} />
                  </mask>
                  <g mask="url(#mask0_2_99)">
                    <path d="M4.54203 28.875C4.26403 28.625 4.13203 28.3193 4.14603 27.958C4.16003 27.5973 4.29203 27.292 4.54203 27.042L14.667 16.875C14.8057 16.7363 14.9514 16.632 15.104 16.562C15.2567 16.4927 15.4164 16.458 15.583 16.458C15.7777 16.458 15.9444 16.4927 16.083 16.562C16.2224 16.632 16.3754 16.7363 16.542 16.875L22.375 22.708L32.042 13.125H28.333C27.9724 13.125 27.667 13 27.417 12.75C27.167 12.5 27.042 12.1943 27.042 11.833C27.042 11.4443 27.167 11.125 27.417 10.875C27.667 10.625 27.9724 10.5 28.333 10.5H35.125C35.4864 10.5 35.7987 10.625 36.062 10.875C36.326 11.125 36.458 11.4307 36.458 11.792V18.583C36.458 18.9443 36.326 19.257 36.062 19.521C35.7987 19.785 35.4864 19.917 35.125 19.917C34.7917 19.917 34.493 19.785 34.229 19.521C33.965 19.257 33.833 18.9443 33.833 18.583V15.042L23.292 25.583C23.1527 25.7223 23.0067 25.8197 22.854 25.875C22.7014 25.9303 22.5417 25.958 22.375 25.958C22.1804 25.958 22.0137 25.9303 21.875 25.875C21.7364 25.8197 21.5974 25.7223 21.458 25.583L15.583 19.708L6.37503 28.917C6.12503 29.167 5.81936 29.292 5.45803 29.292C5.09736 29.292 4.79203 29.153 4.54203 28.875Z" />
                  </g>
                </svg>
              </span>
              <span>Trending</span>
            </Link>
          </li> */}
            <li className="">
              <Link href="create-post">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={40}
                    height={40}
                    viewBox="0 0 40 40"
                    fill="none"
                    className="svg m-auto"
                  >
                    <mask
                      id="mask0_2_120"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={40}
                      height={40}
                    >
                      <rect width={40} height={40} fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_2_120)">
                      <path d="M20.083 28.333C20.4723 28.333 20.7987 28.2013 21.062 27.938C21.326 27.674 21.458 27.3473 21.458 26.958V21.5H27C27.3613 21.5 27.674 21.368 27.938 21.104C28.2013 20.84 28.333 20.5137 28.333 20.125C28.333 19.7083 28.2013 19.368 27.938 19.104C27.674 18.84 27.3473 18.708 26.958 18.708H21.458V13C21.458 12.6387 21.326 12.3263 21.062 12.063C20.7987 11.799 20.4723 11.667 20.083 11.667C19.6943 11.667 19.368 11.799 19.104 12.063C18.84 12.3263 18.708 12.6527 18.708 13.042V18.708H13C12.6387 18.708 12.326 18.847 12.062 19.125C11.7987 19.403 11.667 19.7363 11.667 20.125C11.667 20.5137 11.7987 20.84 12.062 21.104C12.326 21.368 12.6527 21.5 13.042 21.5H18.708V27C18.708 27.3613 18.84 27.674 19.104 27.938C19.368 28.2013 19.6943 28.333 20.083 28.333ZM20 36.667C17.6667 36.667 15.486 36.2363 13.458 35.375C11.4307 34.5137 9.66701 33.333 8.16701 31.833C6.66701 30.333 5.48634 28.5693 4.62501 26.542C3.76367 24.514 3.33301 22.3333 3.33301 20C3.33301 17.6667 3.76367 15.486 4.62501 13.458C5.48634 11.4307 6.66701 9.66699 8.16701 8.16699C9.66701 6.66699 11.4307 5.48633 13.458 4.62499C15.486 3.76366 17.6667 3.33299 20 3.33299C22.3333 3.33299 24.514 3.76366 26.542 4.62499C28.5693 5.48633 30.333 6.66699 31.833 8.16699C33.333 9.66699 34.5137 11.4307 35.375 13.458C36.2363 15.486 36.667 17.6667 36.667 20C36.667 22.3333 36.2363 24.514 35.375 26.542C34.5137 28.5693 33.333 30.333 31.833 31.833C30.333 33.333 28.5693 34.5137 26.542 35.375C24.514 36.2363 22.3333 36.667 20 36.667ZM20 33.875C23.8333 33.875 27.104 32.5207 29.812 29.812C32.5207 27.104 33.875 23.8333 33.875 20C33.875 16.1667 32.5207 12.896 29.812 10.188C27.104 7.47933 23.8333 6.12499 20 6.12499C16.1667 6.12499 12.896 7.47933 10.188 10.188C7.47934 12.896 6.12501 16.1667 6.12501 20C6.12501 23.8333 7.47934 27.104 10.188 29.812C12.896 32.5207 16.1667 33.875 20 33.875Z" />
                    </g>
                  </svg>
                </span>
                <span>Create</span>
              </Link>
            </li>
            {status === "authenticated" ? (
              <li ref={popupRef}>
                <div
                  className="lg:w-[80px] lg:h-[80px] w-[60px]"
                  onClick={() => setIsPopupVisible(!isPopupVisible)}
                >
                  <Image
                    src={data?.user?.image || ""}
                    width={100}
                    height={100}
                    alt="Profile image"
                    className="rounded-full cursor-pointer object-cover"
                  />
                </div>
                <ul
                  className={`dropdown absolute lg:bottom-0 bottom-[100px] w-[200px overflow-hidden] bg-dark space-y-3 p-3 rounded-lg lg:ml-[100px] ${
                    !isPopupVisible && "hidden"
                  }`}
                >
                  <li
                    onClick={() => setIsPopupVisible(!isPopupVisible)}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={40}
                      viewBox="0 0 40 40"
                      fill="none"
                      className="fill-red-500 rotate-45 m-auto"
                    >
                      <mask
                        id="mask0_2_120"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={40}
                        height={40}
                      >
                        <rect width={40} height={40} />
                      </mask>
                      <g mask="url(#mask0_2_120)">
                        <path d="M20.083 28.333C20.4723 28.333 20.7987 28.2013 21.062 27.938C21.326 27.674 21.458 27.3473 21.458 26.958V21.5H27C27.3613 21.5 27.674 21.368 27.938 21.104C28.2013 20.84 28.333 20.5137 28.333 20.125C28.333 19.7083 28.2013 19.368 27.938 19.104C27.674 18.84 27.3473 18.708 26.958 18.708H21.458V13C21.458 12.6387 21.326 12.3263 21.062 12.063C20.7987 11.799 20.4723 11.667 20.083 11.667C19.6943 11.667 19.368 11.799 19.104 12.063C18.84 12.3263 18.708 12.6527 18.708 13.042V18.708H13C12.6387 18.708 12.326 18.847 12.062 19.125C11.7987 19.403 11.667 19.7363 11.667 20.125C11.667 20.5137 11.7987 20.84 12.062 21.104C12.326 21.368 12.6527 21.5 13.042 21.5H18.708V27C18.708 27.3613 18.84 27.674 19.104 27.938C19.368 28.2013 19.6943 28.333 20.083 28.333ZM20 36.667C17.6667 36.667 15.486 36.2363 13.458 35.375C11.4307 34.5137 9.66701 33.333 8.16701 31.833C6.66701 30.333 5.48634 28.5693 4.62501 26.542C3.76367 24.514 3.33301 22.3333 3.33301 20C3.33301 17.6667 3.76367 15.486 4.62501 13.458C5.48634 11.4307 6.66701 9.66699 8.16701 8.16699C9.66701 6.66699 11.4307 5.48633 13.458 4.62499C15.486 3.76366 17.6667 3.33299 20 3.33299C22.3333 3.33299 24.514 3.76366 26.542 4.62499C28.5693 5.48633 30.333 6.66699 31.833 8.16699C33.333 9.66699 34.5137 11.4307 35.375 13.458C36.2363 15.486 36.667 17.6667 36.667 20C36.667 22.3333 36.2363 24.514 35.375 26.542C34.5137 28.5693 33.333 30.333 31.833 31.833C30.333 33.333 28.5693 34.5137 26.542 35.375C24.514 36.2363 22.3333 36.667 20 36.667ZM20 33.875C23.8333 33.875 27.104 32.5207 29.812 29.812C32.5207 27.104 33.875 23.8333 33.875 20C33.875 16.1667 32.5207 12.896 29.812 10.188C27.104 7.47933 23.8333 6.12499 20 6.12499C16.1667 6.12499 12.896 7.47933 10.188 10.188C7.47934 12.896 6.12501 16.1667 6.12501 20C6.12501 23.8333 7.47934 27.104 10.188 29.812C12.896 32.5207 16.1667 33.875 20 33.875Z" />
                      </g>
                    </svg>
                  </li>
                  <li>
                    <span className="font-bold text-themeColor text-xl">
                      {data?.user?.name}
                    </span>
                  </li>
                  <li>
                    <span className="text-themeColor">{data?.user?.email}</span>
                  </li>
                  <li>
                    <Link
                      href={"/dashboard"}
                      className="text-themeColor underline"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/create-post"}
                      className="text-themeColor underline"
                    >
                      Create post
                    </Link>
                  </li>
                  <li
                    onClick={() => signOut()}
                    className="cursor-pointer flex justify-center items-center bg-themeGray rounded-full py-1"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[20px] login-svg m-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                    </span>
                    <span className="text-themeColor">Sign Out</span>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link href="/sign-in">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-[20px] login-svg m-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </span>
                  <span className="text-themeColor">Sign In</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
