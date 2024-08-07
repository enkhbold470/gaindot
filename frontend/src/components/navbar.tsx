"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  IconHome,
  IconUser,
  IconStretching,
  IconDiamondFilled,
} from "@tabler/icons-react";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Workout",
      link: "/workout",
      icon: (
        <IconStretching className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Claim NFT",
      link: "/claim_nft",
      icon: (
        <IconDiamondFilled className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "NFTs",
      link: "/nfts",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="relative w-full ">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
