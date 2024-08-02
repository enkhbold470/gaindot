"use client";
import { GlareCard } from "@/components/ui/glare-card";
import Address from "@/lib/Address.json";
import PolkadotAuth from "@/components/Identicon";
import { web3Accounts } from "@polkadot/extension-dapp";
import DappAuth from "@/components/dapp_auth";
import {
  SignInButtonWeb3,
  SignedInWeb3,
  SignedOutWeb3,
  UserButtonWeb3,
  WalletAddressWeb3,
} from "@/components/PolkadotComponents";
const address = Address[0].walletAddress;
export default function GlareCardDemo() {
  return (
    <>
      <SignInButtonWeb3 />
      <SignedInWeb3>
        <UserButtonWeb3 />
      </SignedInWeb3>
      <SignedOutWeb3>
        <p>Please sign in to access additional features.</p>
        <DappAuth />
      </SignedOutWeb3>
    </>
  );
}
