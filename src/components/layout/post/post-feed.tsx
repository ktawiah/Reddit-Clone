import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/posts";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

interface PostFeedProps {
  initialPost: ExtendedPost[];
  subredditName: string;
}

const PostFeed = (props: PostFeedProps) => {
  const lastPostRef = useRef();
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
      return data;
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: { pages: [props.initialPost], pageParams: [1] },
  });
  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      <li></li>
    </ul>
  );
};
export default PostFeed;
