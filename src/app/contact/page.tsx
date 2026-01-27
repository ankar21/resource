import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Calendar } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1 container py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold mb-4">Starten met Resource</h1>
                    <p className="text-lg text-muted-foreground">Kies de route die bij u past. Plan een persoonlijke demo of duik direct in de data.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Option A: Plan Demo */}
                    <Card className="border-2 hover:border-blue-100 transition-colors">
                        <CardHeader>
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <CardTitle className="text-2xl">Plan een Demo</CardTitle>
                            <p className="text-muted-foreground">15 minuten introductie via Teams/Meet. We laten zien hoe u tijd bespaart.</p>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">Voornaam</Label>
                                        <Input id="first-name" placeholder="Jan" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Achternaam</Label>
                                        <Input id="last-name" placeholder="de Bouwer" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Zakelijk E-mail</Label>
                                    <Input id="email" type="email" placeholder="jan@bouwbedrijf.nl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Bedrijfsnaam</Label>
                                    <Input id="company" placeholder="Bouwbedrijf X" />
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">Plan Afspraak</Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Option B: Upload Sample */}
                    <Card className="border-2 border-primary/20 bg-primary/5">
                        <CardHeader>
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <Upload className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">Direct aan de slag</CardTitle>
                            <p className="text-muted-foreground">Upload uw materiaalstaat en ontvang direct een voorbeeldrapport per mail.</p>
                        </CardHeader>
                        <CardContent className="flex flex-col h-[65%] justify-between">
                            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center bg-white/50">
                                <p className="font-medium text-primary mb-2">Sleep bestand of klik hier</p>
                                <p className="text-xs text-muted-foreground">Excel, CSV (max 5MB)</p>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-muted-foreground mb-4">Alvast zien hoe het werkt?</p>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/demo">Ga naar de online demo omgeving</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="max-w-xl mx-auto mt-16 text-center">
                    <h3 className="font-bold mb-4">Ben je een circulaire bouwhub?</h3>
                    <Button asChild variant="link">
                        <Link href="/partners">Bekijk de mogelijkheden voor partners &rarr;</Link>
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
