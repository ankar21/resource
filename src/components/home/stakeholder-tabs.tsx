"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stakeholderData = {
    bouwbedrijven: {
        title: "Bouwbedrijven",
        benefits: [
            "Tijdwinst in werkvoorbereiding",
            "Minder risico op vertraging",
            "Sneller een compleet dossier",
        ],
        link: "/bouwbedrijven",
    },
    bouwmarkten: {
        title: "Bouwmarkten",
        benefits: [
            "Gerichte leads en orders",
            "Inzicht in marktvraag",
            "Hogere omloopsnelheid",
        ],
        link: "/partners",
    },
    gemeenten: {
        title: "Gemeenten",
        benefits: [
            "Transparante bronvermelding",
            "Eenduidige methodiek",
            "Betere onderbouwing aanvragen",
        ],
        link: "/gemeenten",
    },
};

type StakeholderKey = keyof typeof stakeholderData;

export function StakeholderTabs() {
    const [activeTab, setActiveTab] = useState<StakeholderKey>("bouwbedrijven");

    const tabs: StakeholderKey[] = ["bouwbedrijven", "bouwmarkten", "gemeenten"];

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-lg bg-muted p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-150",
                                activeTab === tab
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {stakeholderData[tab].title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-lg mx-auto">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                >
                    <ul className="space-y-3">
                        {stakeholderData[activeTab].benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center text-lg">
                                <CheckCircle2 className="mr-3 h-5 w-5 text-primary shrink-0" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4">
                        <Button variant="link" asChild className="p-0 h-auto text-primary">
                            <Link href={stakeholderData[activeTab].link}>
                                Bekijk hoe dit werkt →
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
