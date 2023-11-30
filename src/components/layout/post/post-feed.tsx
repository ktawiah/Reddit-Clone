"use client";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/posts";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Post from "./post";

interface PostFeedProps {
  initialPost: ExtendedPost[];
  subredditName?: string;
}

const PostFeed = (props: PostFeedProps) => {
  const session = useSession();
  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite-query"],
    queryFn: async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!props.subredditName ? `&subredditName=${props.subredditName}` : "");
      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: { pages: [props.initialPost], pageParams: [1] },
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? props.initialPost;
  console.log(props.initialPost);

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);
        const currentVote = post.votes.find(
          (vote) => vote.userId === session.data?.user.id
        );
        if (index === posts.length - 1) {
          <li key={post.id} ref={ref}>
            <Post
              votesAmt={votesAmt}
              currentVote={currentVote}
              commentAmount={post.comments.length}
              subredditName={post.subreddit.name}
              post={post}
            />
          </li>;
        } else {
          return (
            <Post
              votesAmt={votesAmt}
              currentVote={currentVote}
              key={post.id}
              commentAmount={post.comments.length}
              subredditName={post.subreddit.name}
              post={post}
            />
          );
        }
      })}
    </ul>
  );
};
export default PostFeed;
