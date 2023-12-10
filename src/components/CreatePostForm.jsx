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

        {linkInput && <div className="flex flex-wrap gap-2">
          {links &&
            links.map((link, i) => (
              <Link key={i} href={link} className="bg-themeGray text-textColor py-1 px-2 rounded-md">
                {link}
              </Link>
            ))}
        </div>}
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
