import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MatchTable } from "@/components/results/match-table";
import { generateMockMatches } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { FileBarChart, Info, Leaf, Target, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ResultsPage({ searchParams }: PageProps) {
    const awaitedSearchParams = await searchParams;
    const source = typeof awaitedSearchParams.source === 'string' ? awaitedSearchParams.source : 'demo';

    const matches = generateMockMatches(source);

    // Calculate summary stats
    const totalCO2 = matches.reduce((acc, curr) => acc + curr.co2SavingKg, 0);
    const avgMatchScore = Math.round(matches.reduce((acc, curr) => acc + curr.matchScore, 0) / matches.length);
    const potentialPartners = new Set(matches.map(m => m.source)).size;

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1 container py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Match resultaten</h1>
                        <p className="text-muted-foreground">
                            Analyse voltooid voor <span className="font-semibold text-foreground">Project X (Demo)</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" asChild>
                            <Link href="/demo">Opnieuw uploaden</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/rapport">
                                <FileBarChart className="mr-2 h-4 w-4" />
                                Genereer rapport
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <Card className="bg-card border-border/50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Leaf className="h-5 w-5 text-primary" />
                                </div>
                                <div className="group relative">
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                    <div className="absolute right-0 top-6 w-48 p-2 bg-popover border rounded-lg shadow-lg text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        Indicatieve berekening op basis van openbare emissiefactoren.
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-primary">-{totalCO2.toLocaleString()} kg</div>
                            <p className="text-sm text-muted-foreground mt-1">Potentiële CO₂ winst</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-border/50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Target className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-foreground">{avgMatchScore}%</div>
                            <p className="text-sm text-muted-foreground mt-1">Gemiddelde match score</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-border/50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-foreground">{potentialPartners}</div>
                            <p className="text-sm text-muted-foreground mt-1">Beschikbare partners</p>
                        </CardContent>
                    </Card>
                </div>

                <MatchTable initialMatches={matches} />
            </main>

            <Footer />
        </div>
    );
}
