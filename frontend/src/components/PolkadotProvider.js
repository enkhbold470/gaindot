// PolkadotProvider.js
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";

const PolkadotContext = createContext();

export const PolkadotProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [extensionReady, setExtensionReady] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

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

export const usePolkadot = () => useContext(PolkadotContext);
