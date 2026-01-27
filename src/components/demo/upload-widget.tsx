"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function UploadWidget() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

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

    const handleProcess = () => {
        if (!file) return;
        setIsAnalyzing(true);
        // Redirect to processing flow with upload source
        router.push("/demo/processing?source=upload");
    };

    return (
        <div className="w-full max-w-xl mx-auto space-y-6">
            <Card
                className={cn(
                    "border-2 border-dashed transition-all duration-200",
                    isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border",
                    "hover:border-primary/50"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <CardContent className="flex flex-col items-center justify-center py-12 text-center h-[300px] relative">
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
                                <Upload className="h-8 w-8 text-primary" />
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
                        <div className="w-full animate-in fade-in zoom-in duration-300">
                            <div className="rounded-full bg-green-100 p-4 mb-4 inline-flex">
                                <FileText className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-1 truncate max-w-sm mx-auto">{file.name}</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                {(file.size / 1024).toFixed(1)} KB • Klaar voor analyse
                            </p>

                            <div className="flex flex-col gap-3 max-w-xs mx-auto">
                                <Button onClick={handleProcess} disabled={isAnalyzing} className="w-full text-lg h-12">
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Starten...
                                        </>
                                    ) : (
                                        "Start Analyse"
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setFile(null)}
                                    disabled={isAnalyzing}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    Verwijder bestand
                                </Button>
                            </div>
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
