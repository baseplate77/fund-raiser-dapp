import { ethers } from "ethers";
import { Modal, Spinner, TextInput } from "flowbite-react";
import React, { FC } from "react";
import { useWalletStore } from "../store/wallet_store";
import { Button } from "./Button";
import { TextField } from "./TextField";

interface DonateDialogProps {
  showDialog: boolean;
  onClose: any;
  fund: any;
}

export const DonateDialog = ({
  showDialog,
  onClose,
  fund,
}: DonateDialogProps) => {
  const [amount, setamount] = React.useState<string>("");

  const [isLoading, setisLoading] = React.useState(false);

  const [error, seterror] = React.useState("");

  const user = useWalletStore((state) => state.user);
  const fetchAllFunds = useWalletStore((state) => state.fetchAllFunds);

  const donate = async () => {
    try {
      setisLoading(true);

      const tx = await fund.contract.fund({
        from: user,
        value: ethers.utils.parseEther(amount),
      });

      await tx.wait();

      fetchAllFunds();

      seterror("");

      onClose();
    } catch (err: any) {
      console.log("err: ", err);

      seterror(err.toString());
    }
    setisLoading(false);
  };

  if (fund === null) return <></>;

  return (
    <Modal show={showDialog} size="lg" onClose={onClose}>
      <Modal.Header>
        <p>
          Donate to <span className="font-bold">{fund.name}</span>
        </p>
      </Modal.Header>

      <div className="w-full px-4 mt-6 font-medium">
        <TextInput
          id="number"
          type="number"
          placeholder="Enter Amount to donate (in ETH)"
          addon="ETH"
          required={true}
          value={amount}
          onChange={(e: any) => setamount(e.target.value)}
        />
      </div>

      {error.length > 0 ? (
        <div className="bg-red-800 sm:mx-auto font-medium tracking-wider p-4 rounded-md text-white text-center text-sm m-4 sm:max-w-md">
          {error}
        </div>
      ) : null}

      <div className="flex justify-between items-center gap-4 px-4 py-6">
        <Button onClick={onClose} className="flex-grow " variant="outlined">
          Cancel
        </Button>

        <Button onClick={donate} className="flex-grow" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Donate "}
        </Button>
      </div>
    </Modal>
  );
};
