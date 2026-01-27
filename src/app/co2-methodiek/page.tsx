"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    Copy,
    Check,
    ChevronDown,
    Upload,
    FileText,
    Calculator,
    Truck,
    HelpCircle
} from "lucide-react";
import { toast } from "sonner";

// Accordion component
function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-border/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left font-medium hover:text-primary transition-colors"
            >
                {title}
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden"
            >
                <div className="pb-4 text-muted-foreground">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

// Stepper component
function MethodStep({ step, title, children, delay }: { step: number; title: string; children: React.ReactNode; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay }}
            className="flex gap-6"
        >
            <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                    {step}
                </div>
                <div className="w-0.5 flex-1 bg-border mt-2" />
            </div>
            <div className="pb-8">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <div className="text-muted-foreground space-y-1">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

export default function CO2MethodiekPage() {
    const [copied, setCopied] = useState(false);

    const handleCopyFormula = () => {
        const formula = `CO₂nieuw = factor_nieuw × hoeveelheid
CO₂alt = factor_alt × hoeveelheid + bewerking
CO₂transport = afstand × transportfactor
CO₂winst = CO₂nieuw – CO₂alt – CO₂transport`;
        navigator.clipboard.writeText(formula);
        setCopied(true);
        toast.success("Formule gekopieerd");
        setTimeout(() => setCopied(false), 2000);
    };

    const sections = [
        { id: "tldr", label: "In 30 sec" },
        { id: "scope", label: "Wat tellen we mee" },
        { id: "stappen", label: "Stappen" },
        { id: "formule", label: "Formule" },
        { id: "bronnen", label: "Bronnen" },
        { id: "faq", label: "FAQ" },
    ];

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-center"
                        >
                            <Badge variant="outline" className="mb-6">
                                Demo mode: indicatief
                            </Badge>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.08 }}
                                className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                            >
                                Hoe berekenen wij CO₂-uitstoot?
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.16 }}
                                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                            >
                                Resource toont per match een indicatieve CO₂-impact en CO₂-winst op basis van materiaaldata, afstand en beschikbare emissiefactoren.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.24 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Button asChild size="lg">
                                    <Link href="/contact">Plan demo (15 min)</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/rapport">Download voorbeeldrapport</Link>
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Trust Bar */}
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-12 text-sm text-muted-foreground">
                            <span>Open data bronnen</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Transparante aannames</span>
                            <span className="hidden sm:inline">•</span>
                            <span>MPG-ready export</span>
                        </div>
                    </div>
                </section>

                {/* Sticky Nav */}
                <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b py-3 hidden md:block">
                    <div className="container">
                        <nav className="flex justify-center gap-6 text-sm">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {section.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* TL;DR */}
                <section id="tldr" className="py-16 scroll-mt-32">
                    <div className="container max-w-3xl">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-6">In 30 seconden</h2>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>We vergelijken nieuw vs. hergebruik/alternatief per materiaalregel.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>We tellen productie-impact (waar data beschikbaar is) + transport naar het project.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>De CO₂-winst is het verschil: (nieuw) – (alternatief) – (extra transport).</span>
                                    </li>
                                </ul>
                                <p className="text-sm text-muted-foreground italic">
                                    Indicatief: uitkomsten variëren per kwaliteit, bewerking en beschikbare data.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Scope */}
                <section id="scope" className="py-16 bg-muted/30 scroll-mt-32">
                    <div className="container max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Wat tellen we wel / niet mee</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="bg-card border-primary/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <CheckCircle2 className="h-6 w-6 text-primary" />
                                        <h3 className="text-xl font-semibold">We nemen mee</h3>
                                    </div>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li>• Materiaaltype + hoeveelheid (uit je materiaalstaat)</li>
                                        <li>• Emissiefactoren (kg CO₂e per eenheid) waar beschikbaar</li>
                                        <li>• Transportafstand (km) van bron naar project (indicatief)</li>
                                        <li>• Eventuele bewerking/refurbishment als die bekend is</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <XCircle className="h-6 w-6 text-muted-foreground" />
                                        <h3 className="text-xl font-semibold">We nemen (nog) niet mee</h3>
                                    </div>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li>• Uitvoering op de bouwplaats (machines/energie)</li>
                                        <li>• Montage/afbouw verschillen per aannemer</li>
                                        <li>• Gebruiksfase (onderhoud/energie)</li>
                                        <li>• Einde levensduur scenario's</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Wil je dit wel meenemen? We kunnen factoren uitbreiden in pilots.
                        </p>
                    </div>
                </section>

                {/* Stappen */}
                <section id="stappen" className="py-16 scroll-mt-32">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Stap-voor-stap methodiek</h2>

                        <div className="pl-2">
                            <MethodStep step={1} title="Inlezen materiaalstaat" delay={0}>
                                <p>We herkennen materiaaltype, eenheid en hoeveelheid uit je Excel/CSV.</p>
                            </MethodStep>
                            <MethodStep step={2} title="Koppelen aan emissiefactor" delay={0.1}>
                                <p>Waar beschikbaar koppelen we een factor (kg CO₂e per eenheid) op basis van materiaalcategorie.</p>
                                <p>Als er geen factor is: we tonen 'Onbekend' en nemen dit niet mee in de som (transparant).</p>
                            </MethodStep>
                            <MethodStep step={3} title="Berekenen nieuw vs alternatief" delay={0.2}>
                                <p>Nieuw: impact op basis van factor × hoeveelheid.</p>
                                <p>Alternatief/hergebruik: impact op basis van beschikbare factor (incl. eventuele standaard bewerking) × hoeveelheid.</p>
                            </MethodStep>
                            <MethodStep step={4} title="Transport en eindresultaat" delay={0.3}>
                                <p>Transportimpact wordt berekend op basis van afstand (km) × gewicht/volume × transportfactor.</p>
                                <p>CO₂-winst = (CO₂ nieuw) – (CO₂ alternatief) – (extra transport).</p>
                            </MethodStep>
                        </div>
                    </div>
                </section>

                {/* Formula */}
                <section id="formule" className="py-16 bg-muted/30 scroll-mt-32">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-8">Formule</h2>

                        <Card className="bg-card border-border/50">
                            <CardContent className="p-6">
                                <div className="font-mono text-sm bg-muted/50 p-4 rounded-lg space-y-2 mb-4">
                                    <p>CO₂<sub>nieuw</sub> = factor_nieuw × hoeveelheid</p>
                                    <p>CO₂<sub>alt</sub> = factor_alt × hoeveelheid + (bewerking indien bekend)</p>
                                    <p>CO₂<sub>transport</sub> = afstand × transportfactor</p>
                                    <p className="pt-2 border-t border-border">
                                        <strong>CO₂<sub>winst</sub> = CO₂<sub>nieuw</sub> – CO₂<sub>alt</sub> – CO₂<sub>transport(alt)</sub></strong>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        We tonen alle aannames per match in het rapport.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleCopyFormula}
                                    >
                                        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                                        {copied ? "Gekopieerd" : "Kopieer formule"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Data & Bronnen */}
                <section id="bronnen" className="py-16 scroll-mt-32">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-8">Data en bronnen</h2>

                        <div className="divide-y">
                            <Accordion title="Waar komen emissiefactoren vandaan?">
                                <p>Waar mogelijk gebruiken we publieke bronnen en/of productspecifieke data die door partners wordt aangeleverd.</p>
                                <p className="mt-2">We werken met categorie-factoren als productspecifieke data ontbreekt.</p>
                            </Accordion>
                            <Accordion title="Wat betekent 'Verified'?">
                                <p>Verified geeft aan dat bron/partner aanvullende informatie heeft aangeleverd (bijv. foto's, specificaties, update-datum).</p>
                            </Accordion>
                            <Accordion title="Hoe bepalen jullie afstand?">
                                <p>Afstand is indicatief en gebaseerd op bronlocatie → projectlocatie (hemelsbreed, gecorrigeerd met factor 1.3 voor wegafstand).</p>
                            </Accordion>
                            <Accordion title="Waarom zijn cijfers indicatief?">
                                <p>Kwaliteit, bewerking, transportmiddel en beschikbaarheid van data beïnvloeden de uitkomst. We zijn transparant over wat we wél en niet meenemen.</p>
                            </Accordion>
                        </div>
                    </div>
                </section>

                {/* Example Table */}
                <section className="py-16 bg-muted/30">
                    <div className="container max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-8">Transparantie in het rapport</h2>

                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50 border-b">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium">Materiaalregel</th>
                                            <th className="px-4 py-3 text-left font-medium">Bron</th>
                                            <th className="px-4 py-3 text-left font-medium">Factor</th>
                                            <th className="px-4 py-3 text-right font-medium">Afstand</th>
                                            <th className="px-4 py-3 text-right font-medium">CO₂ nieuw</th>
                                            <th className="px-4 py-3 text-right font-medium">CO₂ alt</th>
                                            <th className="px-4 py-3 text-right font-medium text-primary">CO₂ winst</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="px-4 py-3">Kozijn hout 180x90</td>
                                            <td className="px-4 py-3">
                                                <span className="flex items-center gap-1">
                                                    Circulair Depot
                                                    <Badge variant="outline" className="text-[10px] h-4 px-1">Verified</Badge>
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-primary">Ja (hout)</td>
                                            <td className="px-4 py-3 text-right">12 km</td>
                                            <td className="px-4 py-3 text-right">45 kg</td>
                                            <td className="px-4 py-3 text-right">8 kg</td>
                                            <td className="px-4 py-3 text-right font-medium text-primary">-37 kg</td>
                                        </tr>
                                        <tr className="border-b bg-muted/20">
                                            <td className="px-4 py-3">Baksteen rood 1000st</td>
                                            <td className="px-4 py-3">
                                                <span className="flex items-center gap-1">
                                                    Weurt Materialen
                                                    <Badge variant="outline" className="text-[10px] h-4 px-1 opacity-50">Unverified</Badge>
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-primary">Ja (steen)</td>
                                            <td className="px-4 py-3 text-right">28 km</td>
                                            <td className="px-4 py-3 text-right">120 kg</td>
                                            <td className="px-4 py-3 text-right">22 kg</td>
                                            <td className="px-4 py-3 text-right font-medium text-primary">-98 kg</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                        <p className="text-center text-sm text-muted-foreground mt-4">
                            Elke regel is herleidbaar: je ziet welke factor/aannames zijn gebruikt.
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="py-16 scroll-mt-32">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-8">Veelgestelde vragen</h2>

                        <div className="divide-y">
                            <Accordion title="Waarom kan CO₂-winst negatief zijn?">
                                <p>Als het alternatief (incl. transport) meer CO₂ kost dan nieuw materiaal, is de "winst" negatief. Dit kan voorkomen bij grote transportafstanden of energie-intensieve bewerking.</p>
                            </Accordion>
                            <Accordion title="Wat als er geen factor beschikbaar is?">
                                <p>We tonen 'Onbekend' en nemen die regel niet mee in de totaalsom. In het rapport zie je exact welke regels wel/niet zijn meegeteld.</p>
                            </Accordion>
                            <Accordion title="Kan ik eigen EPD/gegevens toevoegen?">
                                <p>In de pilot kunnen we productspecifieke EPD-data of eigen factoren importeren. Neem contact op voor de mogelijkheden.</p>
                            </Accordion>
                            <Accordion title="Is dit geschikt voor MPG/vergunning?">
                                <p>Onze export is MPG-ready en compatibel met gangbare rekeninstrumenten. De methodiek is transparant en toetsbaar.</p>
                            </Accordion>
                            <Accordion title="Welke eenheden ondersteunt Resource?">
                                <p>We herkennen gangbare eenheden: stuks, m, m², m³, kg, ton. Onbekende eenheden worden gemarkeerd voor handmatige controle.</p>
                            </Accordion>
                            <Accordion title="Hoe vaak wordt voorraad/brondata geüpdatet?">
                                <p>Partners leveren updates aan. De gemiddelde update-frequentie is 24 uur. Per match zie je de laatste update-datum.</p>
                            </Accordion>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-primary/5">
                    <div className="container max-w-3xl text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Wil je een CO₂/MPG-ready rapport voor jouw project?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Upload je materiaalstaat of plan een korte demo. We laten je precies zien welke aannames gebruikt worden.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href="/demo">
                                    <Upload className="mr-2 h-5 w-5" />
                                    Upload demo bestand
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/contact">Plan demo (15 min)</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
