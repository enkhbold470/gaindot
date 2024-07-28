import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import recentTransactions from "@/lib/recentTransactions.json";


export default function EvervaultCardDemo() {
    return (
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem] bg-black text-white">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

            {recentTransactions[0].date}
            <EvervaultCard text="DOT $over" />

            <h2 className="dark:text-white text-black mt-4 text-sm font-light">
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
                            <p >Amount: {transaction.cryptoAmount} {transaction.currency}</p>
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
