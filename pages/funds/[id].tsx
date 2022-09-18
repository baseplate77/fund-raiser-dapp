import React, { FC } from "react";
import Head from "next/head";
import { Navbar } from "../../components/Navbar";
import { useRouter } from "next/router";
import { useWallet } from "../../utils/hooks/useWallet";
import { useWalletStore } from "../../store/wallet_store";
import {
  convertWeiToEth,
  displayAddress,
  getDiffInDays,
  isFundActive,
  randomPastelColor,
} from "../../utils/helpers";
import { ethers } from "ethers";
import { fetchFundContract } from "../../utils/fetch_contract";
import { Spinner } from "flowbite-react";
import { supportedNetworks } from "../../utils/network_config";
import { Button } from "../../components/Button";
import { DonateDialog } from "../../components/ModalDialog";

interface FundDetailPageProps {}

const FundDetailPage = ({}: FundDetailPageProps) => {
  const { query } = useRouter();

  const signer = useWalletStore<any>((state) => state.signer);
  const user = useWalletStore<any>((state) => state.user);

  const [fund, setfund] = React.useState<any>({ donars: [] });
  const [isLoading, setisLoading] = React.useState(false);

  const [showDialog, setshowDialog] = React.useState(false);

  const openDialog = () => {
    setshowDialog(true);
  };

  const closeDialog = () => {
    setshowDialog(false);

    fetchFundInfo();
  };

  const withdrawFunds = () => {};

  const fetchFundInfo = async () => {
    setisLoading(true);
    const fundAddress: any = query.id;

    const contract = fetchFundContract(fundAddress, signer);

    const name = await contract.fundName();
    const description = await contract.description();
    const endAt = await contract.endAt();
    const balance = await contract.balance();
    const owner = await contract.owner();
    const goal = await contract.goal();
    const nDonars = await contract.nDonar();
    const isActive = isFundActive(endAt.toString());

    const donars = [];

    for (let i = 0; i < nDonars; i++) {
      const address = await contract.donars(i);

      const amount = convertWeiToEth(await contract.donarToAmount(address));

      donars.push({
        address,
        amount,
      });
    }

    setfund({
      name,
      description,
      owner,
      nDonars: nDonars.toString(),
      balance: convertWeiToEth(balance),
      fundAddress,
      endAt: getDiffInDays(endAt),
      isActive,
      isOwner: owner === user,
      donars: donars.reverse(),
      contract,
    });

    setisLoading(false);
  };

  React.useEffect(() => {
    if (!query.id || !signer) return;

    fetchFundInfo();
  }, [query, signer]);

  if (!query.id) return <></>;

  return (
    <>
      <Head>
        <title>Trust Fund</title>
        <meta name="description" content="A fund raise app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <DonateDialog showDialog={showDialog} onClose={closeDialog} fund={fund} />

      {isLoading ? (
        <div className="grid place-content-center  h-[80vh]">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="mx-4 sm:mx-56 my-4">
          <div className="my-8"></div>

          <div className="grid grid-cols-1 gap-4 items-center sm:grid-cols-3">
            <StatsCard value={fund.balance} label="ETH Recieved" />
            <StatsCard value={fund.donars.length} label="Donars " />
            <StatsCard value={fund.endAt} label="Days Remaining" />
          </div>

          <div className="my-8 sm:my-6"></div>

          <div className="flex justify-between gap-4 items-center">
            <div>
              <h3 className="text-xl font-bold tracking-wide">{fund.name}</h3>
              <div className="my-2"></div>
              <AddressLink address={fund.fundAddress} />
            </div>

            {fund.isActive ? (
              <Button onClick={openDialog}>Donate</Button>
            ) : fund.isOwner ? (
              <Button onClick={withdrawFunds}>Withdraw Funds</Button>
            ) : (
              <div className="font-bold text-sm tracking-wide px-4 rounded-md py-1 bg-red-100">
                Fund Expired
              </div>
            )}
          </div>

          <div className="my-4"></div>

          <p>{fund.description}</p>

          <div className="my-8"></div>
          <div className="mx-auto space-y-4 my-4">
            {fund.donars.map((donar: any, index: any) => (
              <p
                key={index}
                className="font-medium tracking-wider uppercase text-sm text-center "
              >
                <AddressLink address={donar.address} /> has donated{" "}
                <span className="uppercase font-bold">{donar.amount} ETH</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FundDetailPage;

const AddressLink = ({ address }: { address: string }) => {
  const chainId = useWalletStore((state) => state.chainId);

  if (!chainId) return <></>;

  if (!address) return <></>;

  return (
    <a
      className="font-bold tracking-wide text-blue-600 text-sm underline uppercase underline-offset-2 cursor-pointer"
      href={`${supportedNetworks[chainId].blockExplorer}/${address}`}
      target="___blank"
    >
      {displayAddress(address)}
    </a>
  );
};

type StatsCardProps = {
  value: string;
  label: string;
};

const StatsCard = ({ value, label }: StatsCardProps) => {
  const color = randomPastelColor();
  return (
    <div className="bg-green-100 rounded-md p-4" style={{ background: color }}>
      <h4 className="font-bold text-4xl mb-1">{value}</h4>
      <p className="uppercase font-bold text-xs tracking-wider">{label}</p>
    </div>
  );
};
