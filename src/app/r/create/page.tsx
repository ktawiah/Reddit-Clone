"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddits";
import { toast } from "@/hooks/use-toast";
import { loginToast } from "@/hooks/use-custom-toast";

const Page = () => {
  const [input, setInput] = useState({ communityName: "" });
  const router = useRouter();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (value.trim() === value && value.length <= 22) {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input.communityName,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Subreddit already exists",
            description: "Choose a different subreddit name",
            variant: "destructive",
          });
        }

        if (error.response?.status === 422) {
          return toast({
            title: "Invalid subreddit name",
            description: "Choose a different name between 3 and 21 characters.",
            variant: "destructive",
          });
        }

        if (error.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not create community",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createCommunity();
  };

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <form
        className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between  items-center">
          <h1 className="text-xl font-semibold ">Create a community</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-2 w-0 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>
            <Input
              name="communityName"
              type="text"
              value={input.communityName}
              onChange={handleChange}
              className="pl-5 text-black"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant={"subtle"} onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={input.communityName.length === 0}
          >
            Create Community
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
