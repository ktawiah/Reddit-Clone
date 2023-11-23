import { z } from "zod";

export const SubredditValidator = z.object({
  name: z.string().min(3).max(23),
});

export const SubredditSubscriptionValidator = z.object({
  subredditId: z.string(),
});

export type CreateSubredditPayload = z.infer<typeof SubredditValidator>;

export type SubscriberToSubredditPayload = z.infer<
  typeof SubredditSubscriptionValidator
>;
