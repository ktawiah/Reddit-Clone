import Link from "next/link";
import { BsReddit } from "react-icons/bs";
import { Icons } from "./icons";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./user-account-nav";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="fixed top-0 inset-0 bg-zinc-100 border-b h-fit py-2">
      <div className="h-full container mx-auto flex items-center justify-between gap-2">
        <Link href={"/"} className="flex gap-1 items-center">
          <Icons.logo size={32} className="text-orange-600" />
          <span className="font-xl font-bold">Reddit</span>
        </Link>
        {/* {search bar} */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href={"/sign-in"} className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
