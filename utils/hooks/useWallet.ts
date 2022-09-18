import { ethers } from "ethers";
import React, { useEffect } from "react";
import { supportedNetworks } from "../network_config";

const useWallet = () => {
  const [user, setuser] = React.useState<string>();
  const [error, seterror] = React.useState<string>("");

  const connectWallet = React.useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const signer = provider.getSigner();

        const { chainId } = await provider.getNetwork();

        setuser(accounts[0]);

        if (!supportedNetworks[chainId]) {
          throw new Error(
            "Switch to Rinkeby or Mumbai network from your browser wallet"
          );
        }
      } catch (error: any) {
        if (error instanceof Error) {
          seterror(error.message);
          return;
        }
        seterror(error.toString());
      }
    } else {
      seterror("Get a Metamask Wallet");
    }
  }, []);

  return { connectWallet, error, user };
};

export { useWallet };
