import CustomFeed from "@/components/layout/feed/custom-user-feed";
import GeneralFeed from "@/components/layout/feed/general-feed";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const session = await getAuthSession();
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 py-6">
        {session ? <CustomFeed /> : <GeneralFeed />}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </p>
          </div>
          <div
            className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6
          "
          >
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Your personal Reddit homepage. Come here to check in wih your
                favorite communities
              </p>
            </div>
            <Link
              className={cn(
                buttonVariants(),
                "mt-4 w-full mb-6 rounded-full font-semibold"
              )}
              href={"/r/submit"}
            >
              Create Post
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-4 w-full mb-6 rounded-full text-blue-500 font-semibold"
              )}
              href={"/r/create"}
            >
              Create community
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
