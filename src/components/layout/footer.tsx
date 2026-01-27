import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="text-xl font-bold text-primary tracking-tight">
                            Resource
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                            Het platform dat circulaire bouwmaterialen inzichtelijk, vindbaar en toepasbaar maakt.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-foreground">Platform</h3>
                        <Link href="/demo" className="text-sm text-muted-foreground hover:text-primary">Demo</Link>
                        <Link href="/partners" className="text-sm text-muted-foreground hover:text-primary">Bouwmarkten</Link>
                        <Link href="/over" className="text-sm text-muted-foreground hover:text-primary">Over ons</Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-foreground">Ondersteuning</h3>
                        <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
                        <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link>
                        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Pilot Status</Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-foreground">Legal</h3>
                        <Link href="/legal" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
                        <Link href="/legal" className="text-sm text-muted-foreground hover:text-primary">Disclaimer</Link>
                        <Link href="/legal" className="text-sm text-muted-foreground hover:text-primary">Algemene Voorwaarden</Link>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Resource Platform. Alle rechten voorbehouden.</p>
                    <div className="flex gap-4">
                        <span>Indicatieve CO2 berekening</span>
                        <span>MPG-ready export</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
