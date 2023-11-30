"use client";
import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import EditorOutput from "./editor-output";
import PostVoteClient from "./post-vote-client";
interface PostProps {
  subredditName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmount: number;
  votesAmt: number;
  currentVote?: Pick<Vote, "type">;
}

const Post = (props: PostProps) => {
  const postRef = useRef<HTMLDivElement>(null);
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          initialVotesAmt={props.votesAmt}
          postId={props.post.id}
          initialVote={props.currentVote?.type}
        />
        <div className="w-0  flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500 flex gap-2 items-center">
            {props.subredditName ? (
              <>
                <Link
                  href={`/r/${props.subredditName}`}
                  className="underline text-zinc-900 text-sm underline-offset-2"
                >{`r/${props.subredditName}`}</Link>
                <span className="px-1 text-2xl">·</span>
              </>
            ) : null}
            <span>Posted by u/{`${props.post.author.name}`}</span>
            {formatTimeToNow(new Date(props.post.createdAt))}
          </div>
          <Link href={`/r/${props.subredditName}/post/${props.post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {props.post.title}
            </h1>
          </Link>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={postRef}
          >
            <EditorOutput content={props.post.content} />
            {postRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            ) : null}
          </div>
        </div>
      </div>
      <div className="text-gray-500 z-20 text-sm p-4 sm:px-6">
        <Link
          href={`r/${props.subredditName}/post/${props.post.id}`}
          className="w-full flex items-center gap-2"
        >
          <MessagesSquare className="h-4 w-4" />
          {props.commentAmount} comments
        </Link>
      </div>
    </div>
  );
};
export default Post;
