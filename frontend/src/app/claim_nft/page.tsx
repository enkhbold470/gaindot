import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import recentTransactions from "@/lib/recentTransactions.json"; // Ensure this path is correct
import {
  SignInButtonWeb3,
  SignedInWeb3,
  SignedOutWeb3,
  UserButtonWeb3,
  WalletAddressWeb3,
} from "@/components/PolkadotComponents";
import { AnimatedPinDemo } from "@/components/pinDemo";

interface ButtonProps {
  text: string;
  primary: boolean;
}
const Button: React.FC<ButtonProps> = ({ text, primary }) => {
  return (
    <button
      className={`px-6 py-3 rounded-full font-semibold text-lg ${
        primary
          ? "bg-cyan-500 text-white"
          : "border border-cyan-500 text-cyan-500"
      }`}
    >
      {text}
    </button>
  );
};

export default function PolkadotCardDemo() {
  // Check if recentTransactions is correctly imported and contains the expected data
  if (!recentTransactions || !recentTransactions.length) {
    return <div>Error: recentTransactions data is not available.</div>;
  }

  return (
    <>
      <SignedOutWeb3>
        <SignInButtonWeb3 />
        <p className="text-white flex justify-center items-center text-2xl">
          Please sign in to view this page.
        </p>{" "}
        {/* <AnimatedPinDemo /> */}
      </SignedOutWeb3>
      <SignedInWeb3>
        <div className="w-screen flex flex-col items-center m-2 p-2">
          <h1 className="flex">
            Polkadot Wallet Address: <WalletAddressWeb3 />
          </h1>
          {/* <h1>Select a NFT you wanna claim </h1> */}
        </div>
        <div className="m-5 p-2 border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-center max-w-[30rem] mx-auto p-4 relative h-[30rem] bg-black text-white top-10">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

          {/* Display EvervaultCard with a random number */}
          <h1 className="text-xl">Total points: </h1>
          {/* Centered and larger "Buy" button */}
          <EvervaultCard
            text={`${Math.floor(Math.random() * 20) + 2} Points`}
          />

          {/* Centered and larger "Buy" button */}
          <div className="my-6">
            <a href="/nfts">
              <Button text="Claim NTFs" primary={true} />
            </a>
          </div>

          <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
            Polkadot Wallet Address: <WalletAddressWeb3 />
          </p>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Check your recent transactions
              </AccordionTrigger>
              <AccordionContent>
                {recentTransactions.slice(0, 5).map((transaction, index) => (
                  <div key={index} className="flex mt-2 w-[20rem]">
                    <p className="border-b border-gray-500">
                      Date: {transaction.date}
                    </p>

                    <p className="border-b border-gray-500">
                      Amount: {transaction.cryptoAmount} {transaction.currency}
                    </p>
                    <p className="border-b border-gray-500">
                      APR: {transaction.apr}
                    </p>
                    <p className="border-b border-gray-500">
                      Status: {transaction.status}
                    </p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SignedInWeb3>
    </>
  );
}
