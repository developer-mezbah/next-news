import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
const SignInBtns = () => {
  return (
    <>
      <h1 className="text-center mt-8 text-themeColor">Sign in</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <button className="flex items-center border border-themeColor p-4 rounded-full gap-4 hover:bg-slate-100/25 transition">
          <span className="text-3xl">
            <FaGithub />
          </span>
          <span>Sign In With GitHub</span>
        </button>

        <button className="flex items-center border border-themeColor p-4 rounded-full gap-4 hover:bg-slate-100/25 transition">
          <span className="text-3xl">
            <FaGoogle />
          </span>
          <span>Sign In With Google</span>
        </button>
      </div>
    </>
  );
};

export default SignInBtns;
