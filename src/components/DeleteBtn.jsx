"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteBtn = ({ id }) => {
  const router = useRouter();

  const [deleteModel, setDeleteModel] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const deleteImage = async (publicId) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({publicId})
    })
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        const post = await res.json();
        toast.success("Post deleted successfully");
        const { publicId } = post;
        await deleteImage(publicId)
        setDeletedId(post.id);
        setDeleteModel(!deleteModel);
        setTimeout(function () {
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      {deletedId && <ToastContainer style={{ transform: "rotate(-90deg)" }} />}
      <button
        onClick={() => setDeleteModel(!deleteModel)}
        className="bg-red-500 px-3 py-2 active:scale-110 hover:scale-110 rounded-br-lg rounded-tr-lg text-textColor"
      >
        Delete
      </button>
      {deleteModel && (
        <div className="bg-dark rounded-xl p-3 fixed top-[200px] left-0 w-[320px] h-[150px] -rotate-90">
          <div className="flex flex-col absolute">
            <h3 className="text-warning text-center">
              Are you sure you want to <br /> delete this post!!!
            </h3>
            <div className="flex mt-3 justify-center gap-4 ite">
              <button
                onClick={() => setDeleteModel(!deleteModel)}
                className="text-textColor bg-themeColor py-2 px-3 rounded-lg"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="text-textColor bg-warning py-2 px-3 rounded-lg"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteBtn;
