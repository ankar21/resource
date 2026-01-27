import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Leaf, Target, TrendingUp, CheckCircle2, Quote } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-primary text-primary-foreground py-24">
                    <div className="container max-w-4xl text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Onze Missie</h1>
                        <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
                            Wij geloven dat elk gebouw een materiaaldepot is voor het volgende.
                            Resource verbindt vraag en aanbod om circulair bouwen de standaard te maken.
                        </p>
                    </div>
                </section>

                {/* Founder Quote Card */}
                <section className="py-20">
                    <div className="container max-w-3xl">
                        <Card className="bg-muted/30 border-border/50 overflow-hidden">
                            <CardContent className="p-8 md:p-10">
                                <div className="flex gap-6">
                                    <div className="hidden sm:flex h-14 w-14 rounded-full bg-primary/10 items-center justify-center shrink-0">
                                        <Quote className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-lg md:text-xl leading-relaxed text-foreground mb-6">
                                            Prachtige kozijnen en balken gaan de container in terwijl een paar kilometer verderop
                                            iemand nieuw hout bestelt. Dat is onacceptabel in een tijd van schaarste. Daarom bouwen
                                            we een radicale versimpeling van hergebruik — data-gedreven, zonder gedoe.
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                R
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">Founder, Resource</p>
                                                <p className="text-sm text-muted-foreground">Ex-bouwsector • Data & inkoop</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Why We Build This */}
                <section className="py-20 bg-muted/30">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6">Waarom we dit bouwen</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Herbruikbaar bouwmateriaal wordt afval, simpelweg omdat de data versnipperd is.
                            Een werkvoorbereider heeft geen tijd om 20 websites af te struinen. Het moet in één keer goed.
                        </p>

                        {/* Theory of Change Timeline */}
                        <h3 className="text-2xl font-bold mb-8">Theory of Change</h3>
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-6">
                                    <div className="text-sm font-semibold text-primary mb-2">Vandaag</div>
                                    <p className="text-sm text-muted-foreground">
                                        De "match" frictieloos maken door data-aggregatie.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-6">
                                    <div className="text-sm font-semibold text-primary mb-2">3–5 jaar</div>
                                    <p className="text-sm text-muted-foreground">
                                        Nieuw inkopen wordt de uitzondering; circulair de default.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-border/50">
                                <CardContent className="p-6">
                                    <div className="text-sm font-semibold text-primary mb-2">10 jaar</div>
                                    <p className="text-sm text-muted-foreground">
                                        De bouwsector is een gesloten kringloop.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* B-Corp Card */}
                <section className="py-20">
                    <div className="container max-w-3xl">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-8 flex gap-6">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Leaf className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Impact First (B-Corp Ambitie)</h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                            Transparante methodiek en bronvermelding
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                            Meetbare impact (CO₂, tonnage, afvalreductie)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                            Werken naar B Corp certificering
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-muted/30">
                    <div className="container max-w-3xl text-center">
                        <h2 className="text-3xl font-bold mb-4">Doe mee met onze missie</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Wil je bijdragen aan de circulaire transitie? Neem contact op of start direct met een demo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href="/demo">Start demo</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/contact">Neem contact op</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
