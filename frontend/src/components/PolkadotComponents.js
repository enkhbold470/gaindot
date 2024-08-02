// PolkadotComponents.js
"use client";
import React from "react";
import { usePolkadot } from "./PolkadotProvider";
import { web3FromAddress } from "@polkadot/extension-dapp";

export const SignInButtonWeb3 = () => {
  const { accounts, extensionReady, walletAddress } = usePolkadot();

  if (!extensionReady) return <button disabled>Loading...</button>;

  return (
    <button
      onClick={() => {
        console.log("Sign in logic here");
        window.location.reload();
      }}
    >
      Click Sign In
    </button>
  );
};

export const SignedInWeb3 = ({ children }) => {
  const { accounts, extensionReady, walletAddress } = usePolkadot();

  if (!extensionReady || accounts.length === 0) {
    return null;
  }

  return <>{children}</>;
};

export const SignedOutWeb3 = ({ children }) => {
  const { accounts, extensionReady, walletAddress } = usePolkadot();

  if (extensionReady && accounts.length > 0) {
    return null;
  }

  return <>{children}</>;
};

export const UserButtonWeb3 = () => {
  const { accounts, extensionReady, walletAddress } = usePolkadot();

  if (!extensionReady || accounts.length === 0) return null;

  return (
    <button onClick={() => console.log("User actions here")}>
      WalletConnected
    </button>
  );
};
export const WalletAddressWeb3 = () => {
  const { accounts, extensionReady, walletAddress } = usePolkadot();

  if (!extensionReady || accounts.length === 0)
    return (
      <h1 className="font-bold text-base text-red-500 px-2">
        No wallet connected, Make sure you have Polkadot.js extension installed
      </h1>
    );

  return (
    <div className="font-bold text-base text-green-500 px-2 ">
      {walletAddress}
    </div>
  );
};
