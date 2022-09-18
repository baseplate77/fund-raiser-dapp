import React, { FC } from "react";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Spinner, TextInput } from "flowbite-react";
import { Button } from "../components/Button";
import { useWalletStore } from "../store/wallet_store";
import { useRouter } from "next/router";

interface StartFundProps {}

const StartFund = ({}: StartFundProps) => {
  const [name, setname] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [goal, setgoal] = React.useState("");
  const [endAt, setendAt] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false);
  const [error, seterror] = React.useState("");

  const router = useRouter();

  const centralFund = useWalletStore<any>((state) => state.centralFund);
  const user = useWalletStore<any>((state) => state.user);

  const startNewFund = async (e: any) => {
    e.preventDefault();
    try {
      setisLoading(true);

      const timeInEpoc = new Date(endAt).getTime() / 1000;

      const tx = await centralFund.createFund(
        name,
        description,
        goal,
        user,
        timeInEpoc
      );

      await tx.wait();

      router.push("/");

      seterror("");
    } catch (err: any) {
      console.log("err: ", err);
      seterror(err.toString());
    }

    setisLoading(false);
  };

  return (
    <>
      <Head>
        <title>Trust Fund</title>
        <meta name="description" content="A fund raise app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <form
        onSubmit={startNewFund}
        className="mx-4 sm:mx-auto max-w-md my-12 font-medium space-y-6"
      >
        <TextInput
          required
          value={name}
          placeholder="Name"
          onChange={(e: any) => setname(e.target.value)}
        />
        <TextInput
          required
          value={goal}
          placeholder="Goal"
          onChange={(e: any) => setgoal(e.target.value)}
        />
        <textarea
          required
          className="w-full text-sm rounded-md bg-gray-50 border-gray-300"
          value={description}
          placeholder="Description"
          onChange={(e: any) => setdescription(e.target.value)}
        />

        <TextInput
          required
          value={endAt}
          placeholder="End At"
          type={"date"}
          onChange={(e: any) => setendAt(e.target.value)}
        />

        <Button
          className="mx-auto block px-8"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "+ Start New Fund "}
        </Button>
      </form>
    </>
  );
};

export default StartFund;
