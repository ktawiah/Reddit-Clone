import Link from "next/link";
import { Icons } from "../../../components/layout/navbar/icons";
import SignUpForm from "./sign-up-form";

const SignUp = () => {
  return (
    <div className="container mx-auto w-full flex flex-col justify-center items-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto text-orange-600" size={32} />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p>
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and Privacy Policy.
        </p>
        <SignUpForm />

        <p className="text-sm text-zinc-800">
          <span>Already a redditor? </span>
          <Link
            href={"/sign-in"}
            className="hover:text-zinc-800 text-sm underline-offset-4 text-blue-700 uppercase"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
