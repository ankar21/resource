"use client";

import { useState, useMemo } from "react";
import { MatchedItem } from "@/lib/mock-data";
import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Search, MapPin, Leaf } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface MatchTableProps {
    initialMatches: MatchedItem[];
}

export function MatchTable({ initialMatches }: MatchTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [materialType, setMaterialType] = useState("all");
    const [sortBy, setSortBy] = useState("distance");
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [maxDistance, setMaxDistance] = useState(100);

    const filteredAndSortedMatches = useMemo(() => {
        let result = [...initialMatches];

        // Filter by search term
        if (searchTerm) {
            result = result.filter(m =>
                m.originalMaterial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.matchedMaterial.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by material type
        if (materialType !== "all") {
            result = result.filter(m => {
                const material = m.originalMaterial.toLowerCase();
                if (materialType === "hout") {
                    return material.includes("hout") || material.includes("balk") || material.includes("kozijn") || material.includes("plank");
                }
                if (materialType === "steen") {
                    return material.includes("steen") || material.includes("beton") || material.includes("tegel") || material.includes("klinker");
                }
                if (materialType === "installatie") {
                    return material.includes("cv") || material.includes("leiding") || material.includes("radiator") || material.includes("installatie");
                }
                return true;
            });
        }

        // Filter by verified only
        if (verifiedOnly) {
            result = result.filter(m => m.matchScore > 85);
        }

        // Filter by max distance
        result = result.filter(m => m.distanceKm <= maxDistance);

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case "distance":
                    return a.distanceKm - b.distanceKm;
                case "score":
                    return b.matchScore - a.matchScore;
                case "co2":
                    return b.co2SavingKg - a.co2SavingKg;
                default:
                    return 0;
            }
        });

        return result;
    }, [initialMatches, searchTerm, materialType, sortBy, verifiedOnly, maxDistance]);

    return (
        <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 items-center p-4 bg-muted/30 rounded-lg border">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Zoek materiaal..."
                        className="pl-8 bg-background"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Select value={materialType} onValueChange={setMaterialType}>
                    <SelectTrigger className="w-[150px] bg-background">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Alle types</SelectItem>
                        <SelectItem value="hout">Hout</SelectItem>
                        <SelectItem value="steen">Steenachtig</SelectItem>
                        <SelectItem value="installatie">Installatie</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                    <Label htmlFor="distance" className="text-sm text-muted-foreground whitespace-nowrap">
                        Max afstand:
                    </Label>
                    <Select value={maxDistance.toString()} onValueChange={(v) => setMaxDistance(parseInt(v))}>
                        <SelectTrigger className="w-[100px] bg-background">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="25">25 km</SelectItem>
                            <SelectItem value="50">50 km</SelectItem>
                            <SelectItem value="100">100 km</SelectItem>
                            <SelectItem value="200">200 km</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Switch
                        id="verified"
                        checked={verifiedOnly}
                        onCheckedChange={setVerifiedOnly}
                    />
                    <Label htmlFor="verified" className="text-sm">Alleen Verified</Label>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px] bg-background">
                        <SelectValue placeholder="Sorteer" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="distance">Afstand (dichtbij)</SelectItem>
                        <SelectItem value="score">Matchscore (hoog)</SelectItem>
                        <SelectItem value="co2">CO₂ besparing</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="text-sm text-muted-foreground">
                {filteredAndSortedMatches.length} van {initialMatches.length} matches
            </div>

            <div className="rounded-lg border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[200px]">Gevraagd</TableHead>
                            <TableHead className="w-[250px]">Gevonden Match</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Bron & Locatie</TableHead>
                            <TableHead>CO₂ Winst</TableHead>
                            <TableHead className="text-right">Actie</TableHead>
                        </TableRow>
                    </TableHeader>
                    <motion.tbody
                        className="[&_tr:last-child]:border-0"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        {filteredAndSortedMatches.length > 0 ? filteredAndSortedMatches.map((match, index) => (
                            <motion.tr
                                key={match.id}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                className={`border-b transition-colors hover:bg-muted/50 ${index % 2 === 0 ? '' : 'bg-muted/20'}`}
                            >
                                <TableCell className="font-medium">
                                    {match.originalMaterial}
                                    <div className="text-xs text-muted-foreground">{match.originalAmount} {match.unit}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {match.matchedMaterial}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Update: {match.lastUpdated}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={match.matchScore > 80 ? "default" : "secondary"} className={
                                        match.matchScore > 80 ? "bg-primary hover:bg-primary/90" :
                                            match.matchScore > 60 ? "bg-amber-500 hover:bg-amber-600" : ""
                                    }>
                                        {match.matchScore}%
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm">
                                        <div className="flex items-center gap-1 font-medium">
                                            {match.source}
                                            {match.matchScore > 85 && (
                                                <Badge variant="outline" className="h-4 px-1 text-[10px] border-primary/30 bg-primary/5 text-primary">Verified</Badge>
                                            )}
                                        </div>
                                        <span className="flex items-center text-muted-foreground text-xs">
                                            <MapPin className="h-3 w-3 mr-1" /> {match.location} ({match.distanceKm} km)
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-primary font-medium">
                                        <Leaf className="h-4 w-4 mr-1" />
                                        -{match.co2SavingKg} kg
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">Details</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Detail Match: {match.matchedMaterial}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 pt-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-semibold text-sm">Aanbieder</h4>
                                                        <p>{match.source}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm">Locatie</h4>
                                                        <p>{match.location} ({match.distanceKm} km)</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm">Geschatte Prijs</h4>
                                                        <p>€ {match.priceIndication},- (indicatief)</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm">Beschikbaarheid</h4>
                                                        <Badge variant="outline" className="border-primary text-primary">Direct beschikbaar</Badge>
                                                    </div>
                                                </div>
                                                <div className="bg-muted p-4 rounded-md text-sm">
                                                    <strong>Technische opmerking:</strong>
                                                    <p className="text-muted-foreground mt-1">
                                                        Dit materiaal is visueel geïnspecteerd en voldoet aan klasse B hergebruikstandaarden.
                                                        Vraag altijd de technische sheets op bij de leverancier.
                                                    </p>
                                                </div>
                                                <Button className="w-full">Neem contact op met aanbieder</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </motion.tr>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    Geen matches gevonden met huidige filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </motion.tbody>
                </Table>
            </div>

            <div className="text-xs text-muted-foreground text-center mt-4">
                * Match scores zijn gebaseerd op materiaaltype, hoeveelheid, afstand en kwaliteit.
            </div>
        </div>
    );
}
