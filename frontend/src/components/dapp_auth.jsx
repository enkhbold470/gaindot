import { useState, useEffect } from "react";
import {
  web3Enable,
  web3FromAddress,
  web3Accounts,
} from "@polkadot/extension-dapp";

const PolkadotComponent = () => {
  const [accounts, setAccounts] = useState([]);
  const [extensionReady, setExtensionReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const allInjected = await web3Enable("GainDOT"); // Replace with your app's name
      if (allInjected.length > 0) {
        const accounts = await web3Accounts();
        setAccounts(accounts);
        setExtensionReady(true);
      } else {
        console.log("Polkadot extension not found.");
      }
    };
    initialize();
  }, []);

  const handleSignTransaction = async () => {
    if (accounts.length > 0) {
      const address = accounts[0].address;
      const transaction = {
        // Define your transaction details here
        method: "someMethod",
        // more fields...
      };

      const injected = await web3FromAddress(address);
      const { signer } = injected;
      try {
        const result = await signer.signTransaction(transaction);
        console.log("Transaction signed:", result);
      } catch (error) {
        console.error("Failed to sign transaction:", error);
      }
    }
  };

  return (
    <div>
      {extensionReady ? (
        <div>
          <h1>Connected Accounts</h1>
          <ul>
            {accounts.map((account) => (
              <li key={account.address}>{account.address}</li>
            ))}
          </ul>
          <button onClick={handleSignTransaction}>Sign Transaction</button>
        </div>
      ) : (
        <p>Loading or Polkadot extension not found...</p>
      )}
    </div>
  );
};

export default PolkadotComponent;
