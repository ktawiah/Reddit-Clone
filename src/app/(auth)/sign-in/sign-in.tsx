import Link from "next/link";
import { Icons } from "../../../components/layout/navbar/icons";
import SignInForm from "./sign-in-form";

const SignIn = () => (
  <div className="container mx-auto w-full flex flex-col justify-center items-center space-y-6 sm:w-[400px]">
    <div className="flex flex-col space-y-2 text-center">
      <Icons.logo className="mx-auto text-orange-600" size={32} />
      <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
      <p className="font-xs">
        By continuing, you agree to our{" "}
        <Link href={""} className="text-blue-500">
          User Agreement
        </Link>{" "}
        and{" "}
        <Link href={""} className="text-blue-500">
          Privacy Policy
        </Link>
        .
      </p>
      <SignInForm />

      <p className="text-sm text-zinc-800">
        <span>New to reddit? </span>
        <Link
          href={"/sign-up"}
          className="hover:text-zinc-800 text-sm underline-offset-4 text-blue-700 uppercase"
        >
          Sign up
        </Link>
      </p>
    </div>
  </div>
);

export default SignIn;
