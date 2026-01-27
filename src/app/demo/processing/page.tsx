"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

// Wrap contents in Suspense boundary
function ProcessingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const source = searchParams.get("source") || "demo";

    const [progress, setProgress] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);

    const steps = [
        "Materiaalstaat analyseren...",
        "Eenheden normaliseren...",
        "Zoeken in circulaire voorraad (3 locaties)...",
        "CO₂ besparingspotentieel berekenen...",
        "Match rapport genereren..."
    ];

    useEffect(() => {
        // Total duration approx 3.5 seconds
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Non-linear progress increment
                return prev + Math.random() * 5;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Switch text steps based on progress
        if (progress < 20) setStepIndex(0);
        else if (progress < 40) setStepIndex(1);
        else if (progress < 70) setStepIndex(2);
        else if (progress < 90) setStepIndex(3);
        else setStepIndex(4);

        if (progress >= 100) {
            // Wait a moment at 100% then redirect
            setTimeout(() => {
                router.push(`/results?source=${source}`);
            }, 800);
        }
    }, [progress, router, source]);

    return (
        <div className="max-w-xl mx-auto w-full text-center">
            <div className="mb-12 relative h-32 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-2xl font-bold flex flex-col items-center gap-4"
                    >
                        {progress < 100 ? (
                            <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        ) : (
                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                        )}
                        <span>{steps[stepIndex]}</span>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="w-full bg-muted/50 rounded-full h-4 overflow-hidden mb-4 border">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                />
            </div>

            <div className="flex justify-between text-muted-foreground text-sm font-mono">
                <span>0%</span>
                <span className="font-bold text-foreground">{Math.round(progress)}%</span>
                <span>100%</span>
            </div>
        </div>
    );
}

export default function ProcessingPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 container flex flex-col items-center justify-center py-20">
                <Suspense fallback={<div>Laden...</div>}>
                    <ProcessingContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
