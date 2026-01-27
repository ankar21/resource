"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Leaf, Check, Info, ArrowRight, Filter, X } from "lucide-react";
import { marketplaceItems, getCategories, filterItems, type MarketplaceItem } from "@/lib/marketplace-data";

function ItemCard({ item, index }: { item: MarketplaceItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
        >
            <Link href={`/marketplace/item/${item.slug}`}>
                <Card className="h-full bg-card border-border/50 transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                    <CardContent className="p-4">
                        {/* Thumbnail placeholder */}
                        <div className="aspect-[4/3] bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">Geen afbeelding</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>

                        {/* Badges row */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            <Badge variant="outline" className="text-xs">
                                {item.quantity} {item.unit}
                            </Badge>
                            {item.verified && (
                                <Badge variant="outline" className="text-xs border-primary/30 bg-primary/5 text-primary">
                                    <Check className="h-3 w-3 mr-0.5" /> Verified
                                </Badge>
                            )}
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                                {item.lastUpdated}
                            </Badge>
                        </div>

                        {/* Location */}
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {item.location} • {item.distanceKm} km
                        </div>

                        {/* CO2 & Price row */}
                        <div className="flex items-center justify-between">
                            {item.co2SavingKg ? (
                                <div className="flex items-center text-sm text-primary group relative">
                                    <Leaf className="h-3.5 w-3.5 mr-1" />
                                    -{item.co2SavingKg} kg CO₂
                                    <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                                    <span className="absolute left-0 top-6 w-32 p-2 bg-popover border rounded-lg shadow-lg text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        Indicatieve CO₂-winst
                                    </span>
                                </div>
                            ) : (
                                <span className="text-sm text-muted-foreground">CO₂: n.v.t.</span>
                            )}
                            <span className="text-sm font-medium">
                                {item.price ? `€${item.price}` : "Op aanvraag"}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

function SkeletonCard() {
    return (
        <Card className="h-full bg-card border-border/50">
            <CardContent className="p-4">
                <div className="aspect-[4/3] bg-muted/50 rounded-lg mb-4 animate-pulse" />
                <div className="h-5 bg-muted/50 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-muted/30 rounded w-2/3 mb-3 animate-pulse" />
                <div className="flex gap-2 mb-3">
                    <div className="h-5 w-16 bg-muted/30 rounded animate-pulse" />
                    <div className="h-5 w-16 bg-muted/30 rounded animate-pulse" />
                </div>
                <div className="h-4 bg-muted/30 rounded w-1/2 animate-pulse" />
            </CardContent>
        </Card>
    );
}

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [maxDistance, setMaxDistance] = useState(200);
    const [availability, setAvailability] = useState("all");
    const [condition, setCondition] = useState("all");
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [sortBy, setSortBy] = useState("relevant");
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const categories = getCategories();

    const filteredItems = useMemo(() => {
        return filterItems(marketplaceItems, {
            search,
            category,
            maxDistance,
            availability: availability !== "all" ? availability : undefined,
            condition: condition !== "all" ? condition : undefined,
            verifiedOnly,
            sortBy,
        });
    }, [search, category, maxDistance, availability, condition, verifiedOnly, sortBy]);

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const scrollToSearch = () => {
        document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container max-w-4xl text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                        >
                            Marketplace voor circulaire bouwmaterialen
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                        >
                            Zoek direct in aangesloten bronnen en partner-voorraden. Met transparante herkomst, update-datum en indicatieve CO₂-impact.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.16 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button size="lg" onClick={scrollToSearch}>
                                Zoek materialen
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/partners">Partner worden</Link>
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* Trust Bar */}
                <div className="border-y border-border/50 py-4 bg-muted/20">
                    <div className="container flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
                        <span>Open data</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Verified partners</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Update binnen 24u</span>
                    </div>
                </div>

                {/* Search Section */}
                <section id="search-section" className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b py-4">
                    <div className="container">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Zoek op materiaal, afmeting, merk, toepassing... (bijv. 'vuren balk 63x175')"
                                    className="pl-10 h-12 text-base"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>

                            {/* Filter Toggle (Mobile) */}
                            <Button
                                variant="outline"
                                className="lg:hidden"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </Button>

                            {/* Desktop Filters */}
                            <div className="hidden lg:flex items-center gap-3">
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="w-[160px]">
                                        <SelectValue placeholder="Categorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={maxDistance.toString()} onValueChange={(v) => setMaxDistance(parseInt(v))}>
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="25">25 km</SelectItem>
                                        <SelectItem value="50">50 km</SelectItem>
                                        <SelectItem value="100">100 km</SelectItem>
                                        <SelectItem value="200">200 km</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center gap-2">
                                    <Switch
                                        id="verified"
                                        checked={verifiedOnly}
                                        onCheckedChange={setVerifiedOnly}
                                    />
                                    <Label htmlFor="verified" className="text-sm whitespace-nowrap">Verified alleen</Label>
                                </div>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-[160px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevant">Meest relevant</SelectItem>
                                        <SelectItem value="distance">Dichtstbij</SelectItem>
                                        <SelectItem value="co2">Hoogste CO₂-winst</SelectItem>
                                        <SelectItem value="recent">Meest recent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Mobile Filters Drawer */}
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="lg:hidden mt-4 p-4 bg-muted/30 rounded-lg space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Filters</span>
                                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid gap-4">
                                    <div>
                                        <Label className="text-sm mb-2 block">Categorie</Label>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map(cat => (
                                                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label className="text-sm mb-2 block">Max afstand</Label>
                                        <Select value={maxDistance.toString()} onValueChange={(v) => setMaxDistance(parseInt(v))}>
                                            <SelectTrigger>
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

                                    <div>
                                        <Label className="text-sm mb-2 block">Beschikbaarheid</Label>
                                        <Select value={availability} onValueChange={setAvailability}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Alle</SelectItem>
                                                <SelectItem value="direct">Direct beschikbaar</SelectItem>
                                                <SelectItem value="op_aanvraag">Op aanvraag</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label className="text-sm mb-2 block">Conditie</Label>
                                        <Select value={condition} onValueChange={setCondition}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Alle</SelectItem>
                                                <SelectItem value="A">Uitstekend (A)</SelectItem>
                                                <SelectItem value="B">Goed (B)</SelectItem>
                                                <SelectItem value="C">Redelijk (C)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="verified-mobile"
                                            checked={verifiedOnly}
                                            onCheckedChange={setVerifiedOnly}
                                        />
                                        <Label htmlFor="verified-mobile">Alleen Verified partners</Label>
                                    </div>

                                    <div>
                                        <Label className="text-sm mb-2 block">Sorteren</Label>
                                        <Select value={sortBy} onValueChange={setSortBy}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="relevant">Meest relevant</SelectItem>
                                                <SelectItem value="distance">Dichtstbij</SelectItem>
                                                <SelectItem value="co2">Hoogste CO₂-winst</SelectItem>
                                                <SelectItem value="recent">Meest recent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Results */}
                <section className="py-8">
                    <div className="container">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-muted-foreground">
                                {filteredItems.length} van {marketplaceItems.length} artikelen
                            </p>
                        </div>

                        {isLoading ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : filteredItems.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredItems.map((item, index) => (
                                    <ItemCard key={item.id} item={item} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-lg text-muted-foreground mb-4">
                                    Geen matches gevonden. Probeer bredere zoekterm of radius.
                                </p>
                                <Button variant="outline" onClick={() => { setSearch(""); setCategory("all"); setMaxDistance(200); }}>
                                    Reset filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

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
