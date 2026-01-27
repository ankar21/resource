import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Leaf, Check, ArrowLeft, Info, Plus, MessageSquare } from "lucide-react";
import { getItemBySlug, marketplaceItems } from "@/lib/marketplace-data";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return marketplaceItems.map((item) => ({
        slug: item.slug,
    }));
}

export default async function ItemDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const item = getItemBySlug(slug);

    if (!item) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1">
                {/* Breadcrumb */}
                <div className="border-b">
                    <div className="container py-4">
                        <Link href="/marketplace" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Terug naar Marketplace
                        </Link>
                    </div>
                </div>

                <div className="container py-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Gallery */}
                        <div>
                            <div className="aspect-[4/3] bg-muted/50 rounded-2xl flex items-center justify-center mb-4">
                                <span className="text-muted-foreground">Geen afbeelding beschikbaar</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="aspect-square bg-muted/30 rounded-lg" />
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div>
                            {/* Header */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.verified && (
                                    <Badge className="bg-primary/10 text-primary border-primary/20">
                                        <Check className="h-3 w-3 mr-1" /> Verified
                                    </Badge>
                                )}
                                <Badge variant="outline">Conditie {item.condition}</Badge>
                                <Badge variant="outline" className="text-muted-foreground">
                                    Update: {item.lastUpdated}
                                </Badge>
                            </div>

                            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

                            <p className="text-muted-foreground mb-6">{item.description}</p>

                            {/* Price */}
                            <div className="mb-6">
                                {item.price ? (
                                    <div className="text-3xl font-bold">€{item.price} <span className="text-base font-normal text-muted-foreground">per {item.unit}</span></div>
                                ) : (
                                    <div className="text-2xl font-semibold text-muted-foreground">Prijs op aanvraag</div>
                                )}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                                <Button size="lg" className="flex-1">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Vraag beschikbaarheid aan
                                </Button>
                                <Button size="lg" variant="outline" className="flex-1">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Voeg toe aan projectlijst
                                </Button>
                            </div>

                            {/* Specs Table */}
                            <Card className="mb-6">
                                <CardContent className="p-0">
                                    <table className="w-full">
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="px-4 py-3 text-sm text-muted-foreground">Beschikbaar</td>
                                                <td className="px-4 py-3 font-medium">{item.quantity} {item.unit}</td>
                                            </tr>
                                            {item.specs.map((spec, i) => (
                                                <tr key={i} className={i < item.specs.length - 1 ? "border-b" : ""}>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">{spec.label}</td>
                                                    <td className="px-4 py-3 font-medium">{spec.value}</td>
                                                </tr>
                                            ))}
                                            <tr className="border-t">
                                                <td className="px-4 py-3 text-sm text-muted-foreground">Categorie</td>
                                                <td className="px-4 py-3 font-medium capitalize">{item.category}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>

                            {/* Source & Location */}
                            <Card className="mb-6">
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-3">Herkomst & Locatie</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Bron</span>
                                            <span className="flex items-center gap-1 font-medium">
                                                {item.source}
                                                {item.verified && <Check className="h-3 w-3 text-primary" />}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Locatie</span>
                                            <span className="flex items-center gap-1 font-medium">
                                                <MapPin className="h-3 w-3" />
                                                {item.location}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Afstand</span>
                                            <span className="font-medium">{item.distanceKm} km (indicatief)</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* CO2 Impact */}
                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Leaf className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-1">Indicatieve CO₂-impact</h3>
                                            {item.co2SavingKg ? (
                                                <>
                                                    <p className="text-2xl font-bold text-primary">-{item.co2SavingKg} kg CO₂</p>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        Ten opzichte van nieuw materiaal (indicatief)
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-muted-foreground">Geen berekening beschikbaar (n.v.t.)</p>
                                            )}
                                            <Link href="/co2-methodiek" className="text-sm text-primary hover:underline inline-flex items-center mt-2">
                                                Hoe berekenen wij dit? <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <section className="py-6 border-t">
                    <div className="container text-center">
                        <p className="text-xs text-muted-foreground">
                            Beschikbaarheid en CO₂ zijn indicatief; definitieve bevestiging via partner.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
