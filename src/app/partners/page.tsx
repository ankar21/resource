import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, LineChart, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function PartnersPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1">
                <section className="bg-slate-900 text-white py-20">
                    <div className="container max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-sm font-medium text-blue-400 mb-6">
                                    Voor Circulaire Bouwmarkten & Sloopbedrijven
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight mb-6 leading-tight">
                                    Word datapartner:<br />
                                    <span className="text-blue-400">Meer gerichte aanvragen, minder ruis.</span>
                                </h1>
                                <p className="text-xl text-gray-300 mb-8">
                                    Koppel uw voorraad aan Resource en ontvang orders die direct matchen met uw aanbod. Geen losse telefoontjes meer over spullen die u niet heeft.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <Link href="/contact">Vraag partner-scan aan</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                                <h3 className="font-bold text-lg mb-4">Partner Pilot Status</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Regio Randstad</span>
                                        <span className="text-green-400 font-mono">2 plekken over</span>
                                    </div>
                                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full w-[80%]"></div>
                                    </div>
                                    <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                                        <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center text-xs">Logo</div>
                                        <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center text-xs">Logo</div>
                                        <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center text-xs">Logo</div>
                                        <div className="text-xs text-gray-400">+ 12 anderen</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container max-w-6xl">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-4">Waarom aansluiten?</h2>
                            <p className="text-muted-foreground">Resource fungeert als uw digitale verkoopkanaal. Wij vertalen vage zoekopdrachten naar concrete materiaal-matches.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card>
                                <CardContent className="pt-8">
                                    <Target className="h-12 w-12 text-blue-600 mb-6" />
                                    <h3 className="text-xl font-bold mb-3">Gerichte Leads</h3>
                                    <p className="text-muted-foreground">U krijgt alleen aanvragen die matchen met wat u heeft staan. Bespaar tijd op offertes die nergens toe leiden.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-8">
                                    <Zap className="h-12 w-12 text-blue-600 mb-6" />
                                    <h3 className="text-xl font-bold mb-3">Automatische Koppeling</h3>
                                    <p className="text-muted-foreground">Lever uw voorraad aan via CSV, XML of API. Wij zorgen voor de standaardisatie en matching.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-8">
                                    <LineChart className="h-12 w-12 text-blue-600 mb-6" />
                                    <h3 className="text-xl font-bold mb-3">Marktinzicht</h3>
                                    <p className="text-muted-foreground">Zie waarnaar gezocht wordt in uw regio. Optimaliseer uw oogststrategie op basis van vraag.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="bg-blue-50 py-20">
                    <div className="container max-w-4xl text-center">
                        <h2 className="text-3xl font-bold mb-6">Gratis Datakwaliteit Scan</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Weet u niet zeker of uw data geschikt is? Stuur ons een voorbeeld van uw voorraadlijst en wij geven vrijblijvend advies over de koppelbaarheid.
                        </p>
                        <Button asChild size="lg" className="w-full sm:w-auto">
                            <a href="mailto:partners@resource-platform.nl?subject=Aanvraag%20Data%20Scan&body=Hierbij%20een%20voorbeeld%20van%20onze%20voorraad.%20Graag%20advies.">
                                Vraag scan aan (via E-mail)
                            </a>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">Wij tekenen desgewenst eerst een NDA.</p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
