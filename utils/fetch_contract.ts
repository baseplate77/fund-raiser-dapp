import { ethers } from "ethers";
import { supportedNetworks } from "./network_config";
import CentralFund from "../data/abi/CentralFund.json";
import Fund from "../data/abi/Fund.json";

const fetchCentralContract = (chainId: any, provider: any) => {
  const address = supportedNetworks[chainId].address;

  return new ethers.Contract(address, CentralFund.abi, provider);
};

const fetchFundContract = (address: string, provider: any) => {
  return new ethers.Contract(address, Fund.abi, provider);
};

export { fetchCentralContract, fetchFundContract };
