import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2, Clock, FileText, TrendingDown, Shield, Zap } from "lucide-react";

export default function BouwbedrijvenPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-primary text-primary-foreground py-24">
                    <div className="container max-w-4xl text-center">
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase bg-white/10 rounded-full">
                            Voor Bouwbedrijven
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Circulair inkopen zonder vertraging
                        </h1>
                        <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto mb-8">
                            Resource bespaart werkvoorbereiders uren zoekwerk en levert direct de onderbouwing die je nodig hebt voor MPG-dossiers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" variant="secondary" className="font-semibold">
                                <Link href="/demo">Probeer de demo</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                                <Link href="/contact">Plan een gesprek</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Value Props */}
                <section className="py-24">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Wat levert Resource jou op?</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Minder zoekwerk, snellere dossiers, betere onderbouwing.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-8">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <Clock className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Uren besparen</h3>
                                    <p className="text-muted-foreground">
                                        Geen 20 websites meer afstruinen. Upload je materiaalstaat en krijg direct matches met beschikbare circulaire voorraad.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-8">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <FileText className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">MPG-ready export</h3>
                                    <p className="text-muted-foreground">
                                        Directe export die compatibel is met rekeninstrumenten. Geen handmatig overtikken meer, minder fouten.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-8">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <TrendingDown className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Lagere MPG-score</h3>
                                    <p className="text-muted-foreground">
                                        Circulair materiaal verlaagt je milieubelasting. Wij leveren de CO₂-berekening voor je dossier.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="py-24 bg-muted/30">
                    <div className="container max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-16">Hoe het werkt</h2>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Upload je materiaalstaat</h3>
                                    <p className="text-muted-foreground">
                                        Sleep je Excel of CSV in Resource. Geen speciale formatting nodig — wij herkennen de materialen automatisch.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Ontvang matches</h3>
                                    <p className="text-muted-foreground">
                                        Binnen seconden zie je beschikbare circulaire alternatieven van onze partners, inclusief locatie, prijs-indicatie en match-score.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Download je rapport</h3>
                                    <p className="text-muted-foreground">
                                        Exporteer een match-rapport en MPG-ready bestand. Direct klaar voor je vergunningsaanvraag of projectdossier.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits List */}
                <section className="py-24">
                    <div className="container max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Voordelen voor werkvoorbereiders</h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                "Tijdwinst in werkvoorbereiding",
                                "Minder risico op vertraging",
                                "Sneller een compleet dossier",
                                "Transparante bronvermelding",
                                "CO₂-onderbouwing inbegrepen",
                                "Directe contact met leveranciers",
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                    <span className="font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-primary/5">
                    <div className="container max-w-3xl text-center">
                        <h2 className="text-3xl font-bold mb-4">Klaar om te starten?</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Probeer Resource gratis met een demo-bestand of plan een gesprek met ons team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href="/demo">Start demo</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/contact">Plan een gesprek</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
