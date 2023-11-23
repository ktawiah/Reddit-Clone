import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SignIn from "./sign-in";
import { ChevronLeft } from "lucide-react";
import SignInForm from "./sign-in-form";
const Page = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href={"/"}
          className={cn(buttonVariants({ variant: "ghost" }), "self-start")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>
        <SignIn />
      </div>
    </div>
  );
};

export default Page;
