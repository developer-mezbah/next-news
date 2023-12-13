
import Link from "next/link";

const EditBtn = ({ id }) => {
  return (
    <Link href={`edit-post/${id}`}>
      <button className="bg-green-500 px-3 py-2 active:scale-110 hover:scale-110 rounded-tl-lg rounded-bl-lg text-textColor">
        Edit
      </button>
    </Link>
  );
};

export default EditBtn;
