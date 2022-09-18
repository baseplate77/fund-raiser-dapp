import React, { FC } from "react";
import { useWalletStore } from "../store/wallet_store";

interface CustomErrorProps {}

export const CustomError = ({}: CustomErrorProps) => {
  const error = useWalletStore((state) => state.error);

  if (!error) return <></>;

  return (
    <div className="bg-red-800 sm:mx-auto font-medium tracking-wider p-4 rounded-md text-white text-center text-sm m-4 sm:max-w-md">
      {error}
    </div>
  );
};
