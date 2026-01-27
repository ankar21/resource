"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, Search, Calculator, Building2, Landmark, Store } from "lucide-react";

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full border-b transition-all duration-200",
            scrolled
                ? "bg-background/95 backdrop-blur-md shadow-sm border-border/50"
                : "bg-background/80 backdrop-blur-sm border-transparent"
        )}>
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-primary tracking-tight">
                    <span>Resource</span>
                </Link>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {/* Product Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/demo"
                                                className="flex gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <Upload className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium leading-none mb-1">Project Match</div>
                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                        Upload materiaalstaat → match-rapport
                                                    </p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/marketplace"
                                                className="flex gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <Search className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium leading-none mb-1">Marketplace</div>
                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                        Zoek direct in aanbod
                                                    </p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li className="md:col-span-2">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/co2-methodiek"
                                                className="flex gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <Calculator className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium leading-none mb-1">CO₂-methodiek</div>
                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                        Hoe we impact berekenen
                                                    </p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Voor wie dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Voor wie</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/bouwbedrijven"
                                                className="flex gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                            >
                                                <Building2 className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium leading-none mb-1">Bouwbedrijven</div>
                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                        Tijdwinst en minder risico
                                                    </p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/gemeenten"
                                                className="flex gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                            >
                                                <Landmark className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium leading-none mb-1">Gemeenten</div>
                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                        Transparante onderbouwing
                                                    </p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/partners"
                                                className="flex gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                            >
                                                <Store className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium leading-none mb-1">Bouwmarkten</div>
                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                        Gerichte leads en orders
                                                    </p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href="/marketplace" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Marketplace
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href="/over" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Over ons
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href="/contact" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Contact
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4">
                    <Link href="/contact" className="hidden sm:inline-block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Inloggen
                    </Link>
                    <Button asChild size="sm" className="font-semibold">
                        <Link href="/demo">Start Demo</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
