import SubscribeLeaveToggle from "@/components/layout/subreddit/subscribe-leave";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

const Layout = async ({ children, params }: LayoutProps) => {
  const session = await getAuthSession();
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });
  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: params.slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;
  if (!subreddit) {
    return notFound();
  }
  const membersSubscribed = await db.subscription.count({
    where: {
      subreddit: {
        name: params.slug,
      },
    },
  });
  return (
    <div className="max-w-7xl container mx-auto h-full pt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 py-6">
        <div className="flex flex-col col-span-2 space-y-6">{children}</div>
        <div className="hidden md:block overflow-hidden h-fit rounded-lg border-gray-200 order-first md:order-last">
          <div className="px-6 py-4">
            <p className="font-semibold py-3">About r/{params.slug}</p>
          </div>
          \
          <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-700">
                <time dateTime={subreddit.createdAt.toDateString()}>
                  {format(subreddit.createdAt, "MMM d, yyyy")}
                </time>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-4">
              <dt className="text-gray-500">Members</dt>
              <dd className="text-gray-700">
                <div className="text-gray-900">{membersSubscribed}</div>
              </dd>
            </div>
            {subreddit.creatorId === session?.user.id ? (
              <div className="flex justify-between gap-x-4 py-3">
                <p className="text-gray-500">You created this community</p>
              </div>
            ) : null}
            <Link
              href={`submit`}
              className={buttonVariants({
                variant: "subtle",
                className: "w-full mb-6",
              })}
            >
              Create Post
            </Link>
            {subreddit.creatorId !== session?.user.id ? (
              <SubscribeLeaveToggle
                isSubscribed={isSubscribed}
                subredditId={subreddit.id}
                subredditName={subreddit.name}
              />
            ) : null}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Layout;
