import { ethers } from "ethers";
import create from "zustand";
import {
  fetchCentralContract,
  fetchFundContract,
} from "../utils/fetch_contract";
import { getDiffInDays, isFundActive } from "../utils/helpers";
import { supportedNetworks } from "../utils/network_config";

const walletStore = (set: any, get: any) => ({
  isLoading: false,
  user: undefined,
  error: undefined,
  signer: undefined,
  chainId: undefined,
  centralFund: undefined,
  fundContracts: [],
  allFunds: [],
  activeFunds: [],
  pastFunds: [],
  myFunds: [],

  connectWallet: async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const signer = provider.getSigner();

        const { chainId } = await provider.getNetwork();

        set({ user: accounts[0], error: undefined, chainId: chainId });

        if (!supportedNetworks[chainId]) {
          throw new Error(
            "Switch to Rinkeby or Mumbai network from your browser wallet"
          );
        }

        set({ centralFund: fetchCentralContract(chainId, signer), signer });
      } catch (error: any) {
        if (error instanceof Error) {
          set({ error: error.message });
          return;
        }
        set({ error: error.toString() });
      }
    } else {
      set({ error: "Get a Metamask Wallet" });
    }
  },

  fetchAllFunds: async () => {
    set({ isLoading: true });
    const contract = get().centralFund;

    const nFunds = await contract.nFunds();

    const fundContracts = [];

    const allFunds = [];
    const activeFunds = [];
    const pastFunds = [];
    const myFunds = [];

    for (let i = 0; i < nFunds; i++) {
      const fundAddress = await contract.funds(i);

      const fundContract = fetchFundContract(fundAddress, get().signer);

      fundContracts.push(fundContract);

      const name = await fundContract.fundName();
      const description = await fundContract.description();
      const endAt = await fundContract.endAt();
      const balance = await fundContract.balance();
      const owner = await fundContract.owner();

      const isActive = isFundActive(endAt.toString());

      console.log("endAt: ", endAt.toString());
      console.log("owner: ", owner.toString());

      getDiffInDays(endAt.toString());

      const data = {
        name,
        description,
        index: i,
        endAt: endAt.toString(),
        balance: ethers.utils.formatEther(balance).toString(),
        contract: fundContract,
        fundAddress,
        isActive,
      };

      allFunds.push(data);

      if (owner === get().address) myFunds.push(data);

      if (isActive) activeFunds.push(data);
      else pastFunds.push(data);
    }

    set({ allFunds, pastFunds, activeFunds, fundContracts, isLoading: false });
  },
});

export const useWalletStore = create(walletStore);
