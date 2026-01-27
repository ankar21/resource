"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Mail, Check, AlertTriangle, FileText } from "lucide-react";
import { toast } from "sonner";

export default function RapportPage() {
    const handleDownloadPDF = () => {
        toast.success("PDF Rapport wordt gegenereerd...");
        setTimeout(() => {
            // In a real app, this would fetch a Blob
            toast.info("Download gestart: resource_demo_rapport.pdf");
        }, 1000);
    };

    const handleDownloadCSV = () => {
        // Generate CSV content
        const csvContent =
            `Categorie,Omschrijving,Hoeveelheid,Eenheid,MatchScore,Bron,CO2_Factor,LastUpdated
Hout,Balkhout vuren,120,m1,98,Buurman,1.25,2023-10-01
Wand,Gipsplaat 12.5mm,50,m2,95,Gebruiktebouwmaterialen,4.0,2023-09-28
Constructie,Staalprofiel HEA140,2,stuks,88,Sloopcheck,600,2023-10-05
Gevel,Baksteen metselwerk,2500,stuks,92,Oogstkaart,0.32,2023-10-02
`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "mpg_ready_export.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("MPG Export gedownload");
        }
    };

    return (
        <div className="flex min-h-screen flex-col font-sans bg-muted/20">
            <Header />

            <main className="flex-1 container py-12">
                <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Rapportage</h1>
                        <p className="text-muted-foreground">Project X (Demo) - Gegenereerd op {new Date().toLocaleDateString('nl-NL')}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleDownloadPDF}>
                            <FileText className="mr-2 h-4 w-4" />
                            PDF Rapport
                        </Button>
                        <Button onClick={handleDownloadCSV}>
                            <Download className="mr-2 h-4 w-4" />
                            MPG-Ready Export
                        </Button>
                    </div>
                </div>

                {/* Report Preview - A4-ish look */}
                <div className="max-w-4xl mx-auto bg-white shadow-lg p-12 min-h-[800px] border relative">
                    {/* Watermark in demo */}
                    <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
                        <span className="text-6xl font-bold text-red-500 -rotate-12 border-4 border-red-500 p-4 inline-block">DEMO</span>
                    </div>

                    <div className="border-b pb-8 mb-8 flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-bold text-primary">Resource<span className="text-black">.</span></h2>
                            <p className="text-sm text-gray-500">Circulair Materiaal Rapport</p>
                        </div>
                        <div className="text-right text-sm">
                            <p className="font-semibold">Project X</p>
                            <p>Ref: DEMO-2024-882</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Samenvatting</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between border-b pb-1">
                                    <span>Aantal regels geüpload:</span>
                                    <span className="font-medium">10</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span>Gevonden matches:</span>
                                    <span className="font-medium">8 (80%)</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span>Totale besparing:</span>
                                    <span className="font-bold text-green-600">- 2.450 kg CO2</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-md">
                            <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Milieu Impact</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Door gebruik van deze circulaire materialen bespaart u naar schatting <strong>2.4 ton CO2</strong> ten opzichte van nieuwkoop (A1-A3).
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Check className="h-4 w-4 text-green-500" />
                                Berekend o.b.v. publieke factoren
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Gedetailleerde Matching</h3>
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="py-2">Materiaal</th>
                                    <th className="py-2">Bron</th>
                                    <th className="py-2">Score</th>
                                    <th className="py-2 text-right">CO2 Winst</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Balkhout vuren", source: "Buurman", score: 98, co2: 150 },
                                    { name: "Baksteen metselwerk", source: "Oogstkaart", score: 92, co2: 1200 },
                                    { name: "Kozijn hout", source: "Sloopcheck", score: 75, co2: 400 },
                                    { name: "Isolatie steenwol", source: "Marktplaats Zakelijk", score: 100, co2: 350 },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50">
                                        <td className="py-3 font-medium">{row.name}</td>
                                        <td className="py-3 text-gray-500">{row.source}</td>
                                        <td className="py-3">
                                            <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                                {row.score}%
                                            </span>
                                        </td>
                                        <td className="py-3 text-right text-green-600 font-medium">-{row.co2} kg</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4} className="py-4 text-center text-gray-400 italic">
                                        ... (bekijk volledige lijst in export)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t pt-8 mt-auto">
                        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded text-xs text-yellow-800">
                            <div className="flex items-center gap-2 font-bold mb-1">
                                <AlertTriangle className="h-4 w-4" /> Disclaimer
                            </div>
                            <p>
                                Deze berekening is indicatief en bedoeld voor voorlopige ontwerpkeuzes.
                                Voor officiële MPG-berekeningen dient u de meegeleverde export te importeren in een gevalideerd instrument (zoals GPR Gebouw of MPG Calc).
                                Resource garandeert niet de beschikbaarheid van getoonde materialen op moment van bestellen.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-8 flex justify-center">
                    <Button variant="ghost" className="text-muted-foreground">
                        <Mail className="mr-2 h-4 w-4" />
                        Stuur direct naar adviseur
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
