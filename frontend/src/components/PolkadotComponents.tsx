// PolkadotComponents.tsx
"use client";
import React, { ReactNode } from "react";
import { usePolkadot } from "./PolkadotProvider";
import { web3FromAddress } from "@polkadot/extension-dapp";

interface ChildrenProps {
  children: ReactNode;
}

export const SignInButtonWeb3: React.FC = () => {
  const { extensionReady } = usePolkadot();

  if (!extensionReady) return <button disabled>Loading...</button>;

  return <button>Sign In</button>;
};

export const SignedInWeb3: React.FC<ChildrenProps> = ({ children }) => {
  const { accounts, extensionReady } = usePolkadot();

  if (!extensionReady || accounts.length === 0) {
    return null;
  }

  return <>{children}</>;
};

export const SignedOutWeb3: React.FC<ChildrenProps> = ({ children }) => {
  const { accounts, extensionReady } = usePolkadot();

  if (extensionReady && accounts.length > 0) {
    return null;
  }

  return <>{children}</>;
};

export const UserButtonWeb3: React.FC = () => {
  const { accounts, extensionReady } = usePolkadot();

  if (!extensionReady || accounts.length === 0) return null;

  return (
    <button onClick={() => console.log("User actions here")}>
      WalletConnected
    </button>
  );
};

export const WalletAddressWeb3: React.FC = () => {
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
