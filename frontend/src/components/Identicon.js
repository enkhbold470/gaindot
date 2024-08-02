import React from "react";
import Identicon from "@polkadot/react-identicon";
import { WalletAddressWeb3 } from "./PolkadotComponents";
class PolkadotAuth extends React.Component {
  render() {
    // Replace with the actual address you want to render
    const address = WalletAddressWeb3;
    // Define the size of the icon
    const size = 30;
    // Define the theme of the icon
    const theme = "substrate";

    return (
      <div>
        <h1>My Polkadot Identicon</h1>
        <Identicon
          value={address}
          size={size}
          theme={theme}
          className="text-white"
        />
      </div>
    );
  }
}

export default PolkadotAuth;
