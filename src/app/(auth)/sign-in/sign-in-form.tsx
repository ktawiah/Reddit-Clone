"use client";

import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/layout/navbar/icons";
import { useToast } from "@/hooks/use-toast";

interface SignInAuthFormProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const SignInForm = ({ className, ...props }: SignInAuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "http://localhost:3000" });
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <>
      <div className={cn("flex justify-center", className)}>
        <Button
          isLoading={isLoading}
          size={"sm"}
          className="w-full flex gap-2"
          onClick={loginWithGoogle}
        >
          <span>{isLoading ? null : <Icons.google className="h-4 w-4" />}</span>
          <span>Google</span>
        </Button>
      </div>
    </>
  );
};

export default SignInForm;
