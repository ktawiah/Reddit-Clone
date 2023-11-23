import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { Icons } from "./icons";
import { AvatarProps } from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage
          src={user.image}
          referrerPolicy="no-referrer"
          alt="Profile picture"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">
            {user.name} <Icons.user className="h-4 w-4" />
          </span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
