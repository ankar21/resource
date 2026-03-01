"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function UploadWidget() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        const validTypes = [
            "text/csv",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ];
        // Simple extension check as well
        const validExt = file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

        if (validExt || validTypes.includes(file.type)) {
            setFile(file);
            toast.success("Bestand succesvol toegevoegd");
        } else {
            toast.error("Alleen .xlsx of .csv bestanden toegestaan");
        }
    };

    const loadSample = () => {
        // Immediate redirect to processing flow
        router.push("/demo/processing?source=sample");
    };

    const handleProcess = async () => {
        if (!file) return;
        setIsAnalyzing(true);

        // Simulate delightful status steps
        setProcessingStep(1); // Inlezen
        await new Promise(r => setTimeout(r, 800));
        setProcessingStep(2); // Matchen met database
        await new Promise(r => setTimeout(r, 1200));
        setProcessingStep(3); // Rapport genereren
        await new Promise(r => setTimeout(r, 800));

        // Redirect to processing flow with upload source
        router.push("/demo/processing?source=upload");
    };

    return (
        <div className="w-full max-w-xl mx-auto space-y-6">
            <Card
                className={cn(
                    "relative overflow-hidden border-2 border-dashed transition-all duration-300",
                    isDragging ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(22,163,74,0.15)] scale-[1.02]" : "border-border",
                    "hover:border-primary/50"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <CardContent className="flex flex-col items-center justify-center py-12 text-center min-h-[300px] relative z-10">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileSelect}
                        disabled={isAnalyzing}
                    />

                    {!file ? (
                        <>
                            <div className="rounded-full bg-primary/10 p-4 mb-4">
                                <Upload className={cn("h-8 w-8 text-primary transition-all duration-300", isDragging && "scale-110 -translate-y-1")} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Sleep je bestand hierheen</h3>
                            <p className="text-muted-foreground text-sm mb-6">Of selecteer een .xlsx of .csv bestand</p>

                            {/* Make the button label trigger the file input via htmlFor */}
                            <Button asChild variant="secondary" disabled={isAnalyzing} className="relative z-10 cursor-pointer">
                                <label htmlFor="file-upload">
                                    Kies bestand
                                </label>
                            </Button>

                            <div className="mt-8 pt-6 border-t w-full">
                                <p className="text-xs text-muted-foreground mb-3">Geen bestand bij de hand?</p>
                                <Button variant="outline" size="sm" onClick={loadSample} disabled={isAnalyzing}>
                                    Gebruik demo materiaalstaat
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full relative px-4">
                            {/* Scanning Animation overlay */}
                            {isAnalyzing && processingStep < 3 && (
                                <motion.div
                                    className="absolute inset-0 z-20 pointer-events-none rounded-xl overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.div
                                        className="h-1 bg-primary shadow-[0_0_15px_rgba(22,163,74,0.8)] w-full absolute left-0 right-0"
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 animate-pulse" />
                                </motion.div>
                            )}

                            <div className={cn("relative z-10 transition-all duration-300", isAnalyzing && "scale-[0.98] opacity-60")}>
                                <div className="rounded-full bg-green-100 p-4 mb-4 inline-flex relative overflow-hidden">
                                    <FileText className="h-8 w-8 text-green-600 relative z-10" />
                                </div>
                                <h3 className="text-lg font-semibold mb-1 truncate max-w-sm mx-auto">{file.name}</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    {(file.size / 1024).toFixed(1)} KB • Klaar voor analyse
                                </p>

                                {!isAnalyzing && (
                                    <div className="flex flex-col gap-3 max-w-xs mx-auto">
                                        <Button onClick={handleProcess} className="w-full text-lg h-12">
                                            Start Analyse
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setFile(null)}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            Andere file kiezen
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Status Steps showing up during analysis */}
                            <AnimatePresence>
                                {isAnalyzing && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: 10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        className="mt-6 space-y-3 text-sm text-left mx-auto max-w-[220px] relative z-30 bg-background/80 backdrop-blur-sm p-4 rounded-xl border shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            {processingStep > 1 ? (
                                                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"><Check className="h-3 w-3 text-primary" /></div>
                                            ) : (
                                                <div className="h-5 w-5 flex items-center justify-center"><Loader2 className="h-3 w-3 animate-spin text-primary" /></div>
                                            )}
                                            <span className={processingStep >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>Inlezen data</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {processingStep > 2 ? (
                                                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"><Check className="h-3 w-3 text-primary" /></div>
                                            ) : processingStep === 2 ? (
                                                <div className="h-5 w-5 flex items-center justify-center"><Loader2 className="h-3 w-3 animate-spin text-primary" /></div>
                                            ) : (
                                                <div className="h-5 w-5 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" /></div>
                                            )}
                                            <span className={processingStep >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>Partners matchen</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {processingStep > 3 ? (
                                                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"><Check className="h-3 w-3 text-primary" /></div>
                                            ) : processingStep === 3 ? (
                                                <div className="h-5 w-5 flex items-center justify-center"><Loader2 className="h-3 w-3 animate-spin text-primary" /></div>
                                            ) : (
                                                <div className="h-5 w-5 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" /></div>
                                            )}
                                            <span className={processingStep >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>Rapport genereren</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex items-start gap-3 p-4 bg-yellow-50/50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
                <AlertCircle className="h-5 w-5 shrink-0 text-yellow-600" />
                <p>
                    <strong>Demo Mode:</strong> Je bestanden worden niet permanent opgeslagen.
                    In deze demo gebruiken we een gesimuleerde matching database.
                </p>
            </div>
        </div>
    );
}
