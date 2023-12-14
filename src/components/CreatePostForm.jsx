"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePostForm = () => {
  const router = useRouter();

  const [uploadLoading, setUploadLoading] = useState(false);

  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("api/categories");
      const catNames = await res.json();
      setCategories(catNames);
    };
    fetchAllCategories();
  }, []);
  const addLink = (e) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };
  const deleteLink = (index) => {
    setLinks((prev) => prev.filter((item, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      const res = await fetch("api/posts/", {
        method: "POST",
        headers: {
          "Content-type": "aplication/json",
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imageUrl,
          publicId,
        }),
      });

      if (res.ok) {
        toast.success("Post Created successfully.");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Something went wrong, post not created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (result) => {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;
      setImageUrl(url);
      setPublicId(public_id);
    }
  };
  // Remove fuctionality for coudinary
  const removeImage = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        setImageUrl("");
        setPublicId("");
        setUploadLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1 className="lg:text-left text-center">Create A Post</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 md:w-2/3 mt-5 space-y-4 m-auto lg:mx-0"
        >
          <input
            type="text"
            placeholder="Title"
            className="py-2 px-3 rounded-lg"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="py-2 px-3 rounded-lg"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {links[0] && (
            <div className="flex flex-wrap gap-2">
              {links &&
                links.map((link, i) => (
                  <div
                    key={i}
                    className="flex gap-3 border-r border-themeColor px-2 link-delete"
                  >
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
                    <span
                      className="cursor-pointer"
                      onClick={() => deleteLink(i)}
                    >
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

          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            className={`h-40 border-2 mt-4 border-dotted border-themeColor grid place-items-center bg-themeGray rounded-xl relative ${
              imageUrl && "pointer-events-none"
            }`}
            onUpload={handleImageUpload}
          >
            {uploadLoading && (
              <div className="z-10 absolute bg-white inset-0 flex items-center justify-center rounded-xl">
                <div className="loader w-16 h-16 border-t-4 border-themeColor border-solid rounded-full animate-spin"></div>
              </div>
            )}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            {imageUrl && (
              <Image
                src={imageUrl}
                fill
                alt={title || "Upload Images"}
                className="absolute object-cover inset-0 rounded-xl z-0"
              />
            )}
          </CldUploadButton>
          {publicId && (
            <button
              onClick={removeImage}
              className="w-fit bg-warning py-2 px-3 rounded-lg font-bold text-textColor"
            >
              Remove Image
            </button>
          )}
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-themeColor rounded-lg"
          >
            <option value="">Select A Category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.catName}>
                  {category.catName}
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="text-xl w-full bg-themeColor text-dark px-4 py-3 rounded-2xl"
          >
            Create Post
          </button>
          <div className="text-textColor font-light text-xl">
            <span className="text-yellow-500 text-xl">Remember:-</span>{" "}
            <i>
              {" "}
              If you want to add a link, then add a Facebook, LinkedIn, Github,
              or Twitter link. If you do not add those links, then the link will
              not show up in the post.
            </i>
          </div>
          {error && <div className="p-2 text-warning font-bold">{error}</div>}
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default CreatePostForm;
