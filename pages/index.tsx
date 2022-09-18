import { BigNumber } from "ethers";
import { Spinner, Tabs } from "flowbite-react";
import Head from "next/head";
import React from "react";
import { CustomError } from "../components/CustomError";
import { FundCard } from "../components/FundCard";
import { DonateDialog } from "../components/ModalDialog";
import { Navbar } from "../components/Navbar";
import { useWalletStore } from "../store/wallet_store";

export default function Home() {
  const centralFund = useWalletStore<any>((state) => state.centralFund);
  const fetchAllFunds = useWalletStore<any>((state) => state.fetchAllFunds);

  const allFunds = useWalletStore<any>((state) => state.allFunds);
  const pastFunds = useWalletStore<any>((state) => state.pastFunds);
  const activeFunds = useWalletStore<any>((state) => state.activeFunds);
  const myFunds = useWalletStore<any>((state) => state.myFunds);
  const isLoading = useWalletStore<any>((state) => state.isLoading);

  const [showDialog, setshowDialog] = React.useState(false);
  const [currentFund, setcurrentFund] = React.useState(null);

  const closeDialog = () => {
    setshowDialog(false);

    setTimeout(() => {
      setcurrentFund(null);
    }, 200);
  };

  const openDialog = (fund: any) => {
    setcurrentFund(fund);
    setshowDialog(true);
  };

  React.useEffect(() => {
    if (centralFund === undefined) return;

    fetchAllFunds();
  }, [centralFund]);

  return (
    <div>
      <Head>
        <title>Trust Fund</title>
        <meta name="description" content="A fund raise app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <DonateDialog
        showDialog={showDialog}
        onClose={closeDialog}
        fund={currentFund}
      />

      <main className="mx-4 sm:mx-24">
        <CustomError />

        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item title="Active Funds">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {isLoading ? (
                <Spinner />
              ) : (
                activeFunds.map((fund: any, i: number) => {
                  return (
                    <FundCard fund={fund} key={i} onActionClick={openDialog} />
                  );
                })
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Past Funds">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {isLoading ? (
                <Spinner />
              ) : (
                pastFunds.map((fund: any, i: number) => {
                  return (
                    <FundCard fund={fund} key={i} onActionClick={openDialog} />
                  );
                })
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item title="My Funds">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {isLoading ? (
                <Spinner />
              ) : (
                allFunds.map((fund: any, i: number) => {
                  return (
                    <FundCard fund={fund} key={i} onActionClick={openDialog} />
                  );
                })
              )}
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </main>

      <footer></footer>
    </div>
  );
}
