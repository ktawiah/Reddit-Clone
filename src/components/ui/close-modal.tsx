"use client";

import { Button } from "./button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { authModalActions } from "@/app/store/slices/authModal";
import { useRouter } from "next/navigation";

const CloseModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <Button
      className="h-6 w-6 p-0 rounded-md"
      variant={"subtle"}
      // onClick={() => dispatch(authModalActions.closeModal())}
      onClick={() => router.back()}
    >
      X
    </Button>
  );
};

export default CloseModal;
