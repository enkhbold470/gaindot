"use client";
import { GlareCard } from "@/components/ui/glare-card";
import Address from "@/lib/Address.json";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  SignInButtonWeb3,
  SignedInWeb3,
  SignedOutWeb3,
  UserButtonWeb3,
  WalletAddressWeb3,
} from "@/components/PolkadotComponents";
import { CardDemo } from "@/components/damn_good_card";

export default function GlareCardDemo() {
  return (
    <>
      <SignedOut>
        <SignInButton />
        {/* <p className="text-white flex justify-center items-center text-2xl">
          
        </p> */}
        <CardDemo />
      </SignedOut>
      <SignedIn>
        <h1>
          Polkadot Wallet Address: <WalletAddressWeb3 />
        </h1>
        <h1>Claim NTFs with your Polkadot Wallet Address:</h1>
        <div className="flex m-4 p-4 items-center text-white gap-5">
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              src="https://i.seadn.io/s/raw/files/0a35984e9442dffdecd9a8f6733b2385.png?auto=format&dpr=1&w=640"
              alt=""
              className="w-full h-full "
            />
          </GlareCard>
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              src="https://raw.seadn.io/files/69e1206e27152333685e814a8f4ec354.png"
              alt=""
              className="w-full h-full "
            />
          </GlareCard>
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              src="https://raw.seadn.io/files/605eaeaa39c7842d72beb7f4b6531e61.png"
              alt=""
              className="w-full h-full "
            />
          </GlareCard>
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              src="https://raw.seadn.io/files/1f53244fdab323f7d188131e651cf81e.png"
              alt=""
              className="w-full h-full "
            />
          </GlareCard>
        </div>
      </SignedIn>
    </>
  );
}
