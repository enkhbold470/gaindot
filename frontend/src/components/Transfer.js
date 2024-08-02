"use client";
import React, { useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

const TransferButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const transferToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const allInjected = await web3Enable("GainDOT"); // Replace 'YourAppName' with your app's name
      if (allInjected.length === 0) {
        throw new Error("Polkadot extension is not installed or enabled.");
      }

      const { address } = await web3Accounts()[0]; // Replace with your logic to select the correct account

      const provider = new WsProvider("ws://127.0.0.1:9944"); // Replace with your Substrate node endpoint
      const api = await ApiPromise.create({ provider });

      const destAddress = "5FdtZiq4pceqcQwpb3HbyMgiiSUMFnwqQQHAFyfTbqWaHbdZ"; // Replace with the recipient's address
      const amount = 1000; // Replace with the amount to transfer

      const injector = await web3FromAddress(address);
      const tx = api.tx.tokenModule.transfer(destAddress, amount); // Adjust this call to match your pallet's naming
      await tx.signAndSend(address, { signer: injector.signer });

      console.log("Transfer successful!");
    } catch (err) {
      console.error("Transfer failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={transferToken} disabled={loading}>
        {loading ? "Transferring..." : "Transfer Token"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TransferButton;
