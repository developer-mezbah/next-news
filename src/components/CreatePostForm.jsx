"use client";
import { categoriesData } from "@/utils/postsData";
import Link from "next/link";
import React, { useState } from "react";

const CreatePostForm = () => {
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");

  const addLink = (e) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };
  const deleteLink = (index) => {
    setLinks((prev) => prev.filter((item, i)=> i !== index))
  }
  return (
    <div>
      <h1 className="lg:text-left text-center">Create A Post</h1>
      <form className="flex flex-col gap-2 md:w-2/3 mt-5 space-y-4 m-auto lg:mx-0">
        <input
          type="text"
          placeholder="Title"
          className="py-2 px-3 rounded-lg"
        />
        <textarea
          placeholder="Content"
          className="py-2 px-3 rounded-lg"
        ></textarea>

        {(links[0] &&
          <div className="flex flex-wrap gap-2">
            {links &&
              links.map((link, i) => (
                <div key={i} className="flex gap-3 border-r border-themeColor px-2 link-delete">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-themeColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                  </span>
                  <Link
                    href={link}
                    className="bg-themeGray text-textColor py-1 px-2 rounded-md"
                  >
                    {link}
                  </Link>
                  <span className="cursor-pointer" onClick={() => deleteLink(i)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-warning"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </span>
                </div>
              ))}
          </div>
        )}
        <div
          className="flex items-center justify-between gap-3"
          onClick={addLink}
        >
          <input
            type="text"
            placeholder="Paste the link and Click add button."
            className="px-3 py-2 border border-themeColor rounded-lg w-full"
            onChange={(e) => setLinkInput(e.target.value)}
            value={linkInput}
          />
          <button className="categoryBtn py-2 px-3 border border-themeColor rounded-lg flex items-center bg-themeGray">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 svg"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </span>
            <span className="text-xl text-themeColor">Add</span>
          </button>
        </div>
        <select className="px-3 py-2 border border-themeColor rounded-lg">
          <option value="">Select A Category</option>
          {categoriesData &&
            categoriesData.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
        <button
          type="submit"
          className="text-xl w-full bg-themeColor text-dark px-4 py-3 rounded-2xl"
        >
          Create Post
        </button>
        <div className="p-2 text-warning font-bold">Error Message</div>
      </form>
    </div>
  );
};

export default CreatePostForm;
