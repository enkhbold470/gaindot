"use client";
import { GlareCard } from "@/components/ui/glare-card";
import Address from "@/lib/Address.json";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function GlareCardDemo() {
  return (
    <>
      <SignedOut>
        <SignInButton />
        <p className="text-white">Please sign in to view this page.</p>
      </SignedOut>
      <SignedIn>
        <UserButton />

        <h1 className="text-white">NFTs I have earned:</h1>
        <div className="flex m-4 p-4 items-center text-white gap-5">
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              src="https://i.seadn.io/s/raw/files/0a35984e9442dffdecd9a8f6733b2385.png?auto=format&dpr=1&w=640"
              alt=""
              className="w-full h-full "
            />
            <p className="text-white font-bold text-xl mt-4">
              {Address[0].walletAddress}
            </p>
          </GlareCard>
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              src="https://raw.seadn.io/files/69e1206e27152333685e814a8f4ec354.png"
              alt=""
              className="w-full h-full "
            />
            <p className="text-white font-bold text-xl mt-4">
              {Address[1].walletAddress}
            </p>
          </GlareCard>
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              src="https://raw.seadn.io/files/605eaeaa39c7842d72beb7f4b6531e61.png"
              alt=""
              className="w-full h-full "
            />
            <p className="text-white font-bold text-xl mt-4">
              {Address[1].walletAddress}
            </p>
          </GlareCard>
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              src="https://raw.seadn.io/files/1f53244fdab323f7d188131e651cf81e.png"
              alt=""
              className="w-full h-full "
            />
            <p className="text-white font-bold text-xl mt-4">
              {Address[1].walletAddress}
            </p>
          </GlareCard>
        </div>
      </SignedIn>
    </>
  );
}
