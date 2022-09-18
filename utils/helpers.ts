import { ethers } from "ethers";

const displayAddress = (address: string) =>
  address.substring(0, 5) +
  "..." +
  address.substring(address.length - 3, address.length);

const copy = (value: string) => {
  navigator.clipboard.writeText(value);
};

const convertWeiToEth = (value: any) =>
  ethers.utils.formatEther(value).toString();

const isFundActive = (endAt: any) => {
  const now = new Date();
  const endDate = new Date(endAt * 1000);

  return endDate.getTime() - now.getTime() >= 0;
};

const getDiffInDays = (endAt: any) => {
  const now = new Date();
  const endDate = new Date(endAt * 1000);

  const diff = endDate.getTime() - now.getTime();

  return ~~(diff / (1000 * 60 * 60 * 24));
};

function randomPastelColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (15 * Math.random() + "%,") +
    (94 + 1 * Math.random() + "%)")
  );
}
export {
  displayAddress,
  convertWeiToEth,
  copy,
  getDiffInDays,
  isFundActive,
  randomPastelColor,
};
