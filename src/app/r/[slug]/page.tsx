import PostFeed from "@/components/layout/post/post-feed";
import MiniCreatePost from "@/components/layout/subreddit/mini-create-post";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}
const Page = async ({ params }: PageProps) => {
  const session = await getAuthSession();
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          comments: true,
          votes: true,
          subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) {
    return notFound();
  }
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">{subreddit.name}</h1>
      <MiniCreatePost session={session} />
      <PostFeed />
    </>
  );
};

export default Page;
