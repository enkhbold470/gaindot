"use client";
import { GlareCard } from "@/components/ui/glare-card";
import Address from "@/lib/Address.json";
import {
  SignInButtonWeb3,
  SignedInWeb3,
  SignedOutWeb3,
  UserButtonWeb3,
  WalletAddressWeb3,
} from "@/components/PolkadotComponents";
import { CardDemo } from "@/components/damn_good_card";
import nft from "@/lib/nft.json";
export default function GlareCardDemo() {
  return (
    <>
      {/* <SignedOutWeb3>
        <SignInButtonWeb3 />
        <p className="text-white flex justify-center items-center text-2xl">
          Please sign in to view this page.
        </p>
       
      </SignedOutWeb3>
      <SignedInWeb3> */}
      <div className="flex flex-col ">
        <div className=" flex items-center m-2 p-2 ">
          <h1 className="flex">
            Polkadot Wallet Address: <WalletAddressWeb3 />
          </h1>
        </div>
        <h1 className="">Select a NFT you wanna claim </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 h-screen m-4 p-4 text-white gap-5">
          {nft.map((nfts, index) => (
            <div key={index}>
              <a href={nfts.link} target="_blank">
                <GlareCard className="flex items-center justify-center">
                  <img src={nfts.image} alt="" className="w-full h-full " />
                </GlareCard>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* </SignedInWeb3> */}
    </>
  );
}
