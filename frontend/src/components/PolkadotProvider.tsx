// PolkadotProvider.tsx
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";

interface Account {
  address: string;
  // Add other properties if needed
}

interface PolkadotContextType {
  accounts: Account[];
  extensionReady: boolean;
  walletAddress: string | null;
}

const PolkadotContext = createContext<PolkadotContextType | undefined>(
  undefined
);

interface PolkadotProviderProps {
  children: ReactNode;
}

export const PolkadotProvider: React.FC<PolkadotProviderProps> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [extensionReady, setExtensionReady] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const allInjected = await web3Enable("GainDOT");
      if (allInjected.length > 0) {
        const accounts = await web3Accounts();
        setAccounts(accounts);
        setExtensionReady(true);
        setWalletAddress(accounts[0].address);
        console.log("Polkadot.js extension found.");
      } else {
        console.log("Polkadot.js extension not found.");
      }
    };

    initialize();
  }, []);

  return (
    <PolkadotContext.Provider
      value={{ accounts, extensionReady, walletAddress }}
    >
      {children}
    </PolkadotContext.Provider>
  );
};

export const usePolkadot = (): PolkadotContextType => {
  const context = useContext(PolkadotContext);
  if (!context) {
    throw new Error("usePolkadot must be used within a PolkadotProvider");
  }
  return context;
};
