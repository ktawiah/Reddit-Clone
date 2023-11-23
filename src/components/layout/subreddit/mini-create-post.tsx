"use client";

import UserAvatar from "../navbar/user-avatar";
import { Session } from "next-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { Image as ImageIcon, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MiniProps {
  session: Session | null;
}

const MiniCreatePost = ({ session }: MiniProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <Card>
        <CardContent className="flex gap-2 items-center pt-6">
          <div className="relative inline-block">
            <UserAvatar
              user={{
                name: session?.user.name || null,
                image: session?.user.image || null,
              }}
            />
            <span className="bg-green-600 rounded-full h-3 w-3 absolute bottom-0.5 right-0" />
          </div>
          <Input
            type="text"
            placeholder="Create Post"
            readOnly
            onSelect={() => router.push(pathname + "/submit")}
          />
          <Button
            variant={"ghost"}
            onClick={() => router.push(pathname + "/submit")}
          >
            <ImageIcon className="text-zinc-600" />
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => router.push(pathname + "/submit")}
          >
            <Link2 className="text-zinc-600" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default MiniCreatePost;
