import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2, Shield, Eye, FileCheck, BarChart3, Leaf } from "lucide-react";

export default function GemeentenPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-primary text-primary-foreground py-24">
                    <div className="container max-w-4xl text-center">
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase bg-white/10 rounded-full">
                            Voor Gemeenten
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Verifieerbare duurzaamheid in bouwprojecten
                        </h1>
                        <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto mb-8">
                            Resource biedt transparante onderbouwing voor circulair materiaalgebruik. Geen claims meer zonder bewijs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" variant="secondary" className="font-semibold">
                                <Link href="/contact">Neem contact op</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                                <Link href="/demo">Bekijk de demo</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Value Props */}
                <section className="py-24">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Wat levert Resource gemeenten op?</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Transparantie, verifieerbaarheid en eenduidige methodiek.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-8">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <Eye className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Transparante bronvermelding</h3>
                                    <p className="text-muted-foreground">
                                        Elk materiaal is herleidbaar naar de bron. Geen vage claims — concrete gegevens van leveranciers.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-8">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <FileCheck className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Eenduidige methodiek</h3>
                                    <p className="text-muted-foreground">
                                        Alle CO₂-berekeningen gebruiken dezelfde openbare emissiefactoren. Consistent en vergelijkbaar.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-8">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <BarChart3 className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Betere onderbouwing</h3>
                                    <p className="text-muted-foreground">
                                        Vergunningsaanvragen met Resource-rapporten zijn completer en makkelijker te beoordelen.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How municipalities benefit */}
                <section className="py-24 bg-muted/30">
                    <div className="container max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-16">Hoe Resource gemeenten helpt</h2>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Aannemers gebruiken Resource</h3>
                                    <p className="text-muted-foreground">
                                        Bouwbedrijven uploaden hun materiaalstaat en ontvangen matches met circulaire voorraad. Alles wordt automatisch gedocumenteerd.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Gestandaardiseerd rapport</h3>
                                    <p className="text-muted-foreground">
                                        Het Resource-rapport bevat herkomst, CO₂-besparing, en match-kwaliteit — allemaal in één format dat makkelijk te controleren is.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Snellere vergunningverlening</h3>
                                    <p className="text-muted-foreground">
                                        Met volledige onderbouwing kost beoordelen minder tijd. Aanvragen die voldoen zijn direct herkenbaar.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits List */}
                <section className="py-24">
                    <div className="container max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Voordelen voor gemeenten</h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                "Transparante bronvermelding",
                                "Eenduidige methodiek",
                                "Betere onderbouwing aanvragen",
                                "Vergelijkbare CO₂-cijfers",
                                "Minder vage duurzaamheidsclaims",
                                "MPG-ready exports voor controle",
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
                        <h2 className="text-3xl font-bold mb-4">Interesse in een pilot?</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            We werken graag samen met gemeenten die vooroplopen in de circulaire transitie.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href="/contact">Neem contact op</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/demo">Bekijk de demo</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
