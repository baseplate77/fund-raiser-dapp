import Link from "next/link";
import React from "react";
import { useWalletStore } from "../store/wallet_store";
import { copy, displayAddress } from "../utils/helpers";
import { Button } from "./Button";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  const connectWallet = useWalletStore((state) => state.connectWallet);
  const user = useWalletStore((state) => state.user);

  const isConnected = user !== undefined;

  React.useEffect(() => {
    connectWallet();

    if (window.ethereum) {
      // Detect metamask account change
      window.ethereum.on("accountsChanged", () => connectWallet());

      // Detect metamask network change
      window.ethereum.on("chainChanged", () => connectWallet());
    }
  }, []);

  return (
    <nav className="mx-4 my-4 sm:mx-24 flex items-center justify-between">
      <Link href="/">
        <h4 className="text-xl cursor-pointer font-bold tracking-wide">
          Fund Raiser
        </h4>
      </Link>

      <div className="flex gap-4 items-center">
        <Link href={"/start-fund"}>
          <Button
            variant="filled"
            className="font-medium text-sm tracking-wider"
            onClick={connectWallet}
          >
            + New Fund
          </Button>
        </Link>

        {isConnected ? (
          <p
            className="text-sm font-bold tracking-wide px-4 py-2 bg-gray-200 rounded-full text-gray-700 cursor-copy"
            onClick={() => copy(user)}
          >
            {displayAddress(user)}
          </p>
        ) : (
          <Button
            variant="filled"
            className="font-medium text-sm tracking-wider"
            onClick={connectWallet}
          >
            Connect Metamask
          </Button>
        )}
      </div>
    </nav>
  );
};
