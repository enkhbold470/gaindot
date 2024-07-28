import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import recentTransactions from "@/lib/recentTransactions.json"; // Ensure this path is correct
interface ButtonProps{
    text: string,
    primary: boolean;
}
const Button: React.FC<ButtonProps> = ({ text, primary }) => {
    return (
        <button className={`px-6 py-3 rounded-full font-semibold text-lg ${primary ? 'bg-cyan-500 text-white' : 'border border-cyan-500 text-cyan-500'}`}>
            {text}
        </button>
    );
};

export default function PolkadotCardDemo() {
    // Check if recentTransactions is correctly imported and contains the expected data
    if (!recentTransactions || !recentTransactions.length) {
        return <div>Error: recentTransactions data is not available.</div>;
    }

    return (
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-center max-w-sm mx-auto p-4 relative h-[30rem] bg-black text-white">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

            {/* Display EvervaultCard with a random number */}
            <EvervaultCard text={`${Math.floor(Math.random() * 20) + 1} DOT`} />

            {/* Centered and larger "Buy" button */}
            <div className="mt-6">
                <Button text="Buy" primary={true} />
            </div>

            <h2 className="dark:text-white text-black mt-8 text-sm font-light">
                Check your Recent Investment
            </h2>
            <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
                link here
            </p>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Check your recent status</AccordionTrigger>
                    <AccordionContent>
                        {recentTransactions.slice(0, 3).map((transaction, index) => (
                            <div key={index} className="mt-2">
                                <p>Date: {transaction.date}</p>
                                <p>Amount: {transaction.cryptoAmount} {transaction.currency}</p>
                                <p>APR: {transaction.apr}</p>
                                <p>Status: {transaction.status}</p>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
