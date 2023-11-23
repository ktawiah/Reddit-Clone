import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SignUpForm from "./sign-up-form";
import SignUp from "./sign-up";
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
        <SignUp />
      </div>
    </div>
  );
};

export default Page;
