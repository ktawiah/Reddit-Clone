"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import UserAvatar from "./user-avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserAccountNav {
  user: Pick<User, "name" | "email" | "image">;
}

const UserAccountNav = ({ user }: UserAccountNav) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex flex-col gap-2 p-2 leading-none space-y-1">
          {user.name && <p className="font-medium">{user.name}</p>}
          {user.email && (
            <p className="truncate text-sm text-zinc-700">{user.email}</p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/"}>Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/r/create"}>Create Community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/settings"}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/sign-in` });
          }}
        >
          <Link href={"/sign-in"}>Sign Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
