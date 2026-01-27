import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroScroll } from "@/components/home/hero-scroll";
import { StakeholderTabs } from "@/components/home/stakeholder-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BarChart3, Upload, FileText, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Scrollytelling Hero */}
        <HeroScroll>
          <div className="max-w-3xl space-y-6 px-4">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              Pilot fase: Demo mode actief
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-lg">
              Circulair inkopen<br />
              zonder tijdverlies.
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/80">
              Upload je materiaalstaat. Resource matcht direct met aangesloten circulaire partners en levert een rapport + MPG-ready export.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 h-14">
                <Link href="/contact">
                  Plan demo (15 min)
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 h-14 backdrop-blur-sm">
                <Link href="/demo">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload demo bestand
                </Link>
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-6 text-sm text-white/60">
              <span>Open data bronnen</span>
              <span className="hidden sm:inline">•</span>
              <span>Voorraad 24u updated</span>
              <span className="hidden sm:inline">•</span>
              <span>MPG-ready export</span>
            </div>
          </div>
        </HeroScroll>

        {/* Problem Section */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Het ontbreekt niet aan ambitie,<br className="hidden sm:inline" /> maar aan overzicht in inkoop.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Er is genoeg herbruikbaar materiaal, maar het is onvindbaar onder tijdsdruk.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-card border-border/50">
                <CardContent className="pt-0">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Versnipperd aanbod</h3>
                  <p className="text-muted-foreground text-sm">
                    Materialen staan verspreid over tientallen platforms. Zoeken kost uren.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/50">
                <CardContent className="pt-0">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Complex papierwerk</h3>
                  <p className="text-muted-foreground text-sm">
                    MPG/CO₂ onderbouwing vereist, wat leidt tot extra dossier-rondes.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/50">
                <CardContent className="pt-0">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Handmatig werk</h3>
                  <p className="text-muted-foreground text-sm">
                    Bellen, mailen, Excel-lijsten overtikken. Foutgevoelig en traag.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works (Stepper) */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Van lijst naar levering in 3 stappen
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3 relative max-w-4xl mx-auto">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-border" />

              <div className="flex flex-col items-center text-center relative">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 text-2xl font-bold shadow-lg z-10">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload</h3>
                <p className="text-muted-foreground">
                  Sleep je materiaalstaat (Excel/CSV). Geen formatting nodig.
                </p>
              </div>
              <div className="flex flex-col items-center text-center relative">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 text-2xl font-bold shadow-lg z-10">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Match</h3>
                <p className="text-muted-foreground">
                  Direct voorraadcheck bij aangesloten circulaire partners.
                </p>
              </div>
              <div className="flex flex-col items-center text-center relative">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 text-2xl font-bold shadow-lg z-10">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Rapport</h3>
                <p className="text-muted-foreground">
                  Match-rapport + MPG-ready export voor je vergunning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Two Ways to Source */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Twee manieren om circulair te sourcen
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <Card className="bg-card border-border/50 p-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Project Match</h3>
                <p className="text-muted-foreground mb-6">
                  Upload je materiaalstaat en ontvang direct een match-rapport met circulaire alternatieven.
                </p>
                <Button asChild>
                  <Link href="/demo">Start match</Link>
                </Button>
              </Card>
              <Card className="bg-card border-border/50 p-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Marketplace</h3>
                <p className="text-muted-foreground mb-6">
                  Zoek direct in het aanbod van onze partners en vraag beschikbaarheid aan.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/marketplace">Open marketplace</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Stakeholder Tabs */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Voor wie is Resource?
              </h2>
            </div>
            <StakeholderTabs />
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-16 border-y border-border/50">
          <div className="container text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Transparantie staat voorop
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground">Open Data</span>
                <span className="text-sm text-muted-foreground">Factoren uit publieke bronnen</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground">24 uur</span>
                <span className="text-sm text-muted-foreground">Voorraad last updated</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground">MPG-ready</span>
                <span className="text-sm text-muted-foreground">Export voor rekeninstrumenten</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-primary/5">
          <div className="container max-w-3xl text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              Beperkt aantal plekken
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Start vandaag met jouw eerste match
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Upload een sample materiaalstaat om te zien hoe het werkt, of vraag direct een pilot intake aan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base h-12 px-8">
                <Link href="/demo">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload demo bestand
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base h-12 px-8">
                <Link href="/contact">
                  Vraag pilot intake
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
