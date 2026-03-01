"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Plus, Loader2, CheckCircle2, Phone, Building2, MapPin, Mail } from "lucide-react";

interface ItemActionsProps {
    item: {
        title: string;
        quantity: number;
        unit: string;
        source: string;
    };
}

export function ItemActions({ item }: ItemActionsProps) {
    // State for Vraag beschikbaarheid aan
    const [isRequestOpen, setIsRequestOpen] = useState(false);
    const [requestQuantity, setRequestQuantity] = useState(1);
    const [isRequesting, setIsRequesting] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState(false);

    // State for Voeg toe aan projectlijst
    const [isProjectOpen, setIsProjectOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);

    // State for Neem contact op met aanbieder
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleRequest = async () => {
        setIsRequesting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsRequesting(false);
        setRequestSuccess(true);

        // Auto close after success
        setTimeout(() => {
            setIsRequestOpen(false);
            // reset state after close animation
            setTimeout(() => setRequestSuccess(false), 300);
        }, 2000);
    };

    const handleAddToProject = async () => {
        setIsAdding(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsAdding(false);
        setAddSuccess(true);

        // Auto close after success
        setTimeout(() => {
            setIsProjectOpen(false);
            // reset state after close animation
            setTimeout(() => setAddSuccess(false), 300);
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-3 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1" onClick={() => setIsRequestOpen(true)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Vraag beschikbaarheid aan
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={() => setIsProjectOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Voeg toe aan projectlijst
                </Button>
            </div>

            <Button size="lg" variant="secondary" className="w-full" onClick={() => setIsContactOpen(true)}>
                <Phone className="h-4 w-4 mr-2" />
                Neem contact op met aanbieder
            </Button>

            {/* Dialog: Vraag beschikbaarheid aan */}
            <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Beschikbaarheid aanvragen</DialogTitle>
                        <DialogDescription>
                            Geef aan hoeveel je nodig hebt van "{item.title}".
                        </DialogDescription>
                    </DialogHeader>

                    {!requestSuccess ? (
                        <div className="py-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Aantal ({item.unit})</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min={1}
                                        max={item.quantity}
                                        value={requestQuantity}
                                        onChange={(e) => setRequestQuantity(parseInt(e.target.value) || 1)}
                                    />
                                    <p className="text-xs text-muted-foreground">Maximaal beschikbaar: {item.quantity} {item.unit}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Aangevraagd!</h3>
                            <p className="text-center text-muted-foreground">De aanbieder neemt zo spoedig mogelijk contact met je op.</p>
                        </div>
                    )}

                    {!requestSuccess && (
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsRequestOpen(false)} disabled={isRequesting}>
                                Annuleren
                            </Button>
                            <Button onClick={handleRequest} disabled={isRequesting}>
                                {isRequesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Bevestigen
                            </Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog: Voeg toe aan projectlijst */}
            <Dialog open={isProjectOpen} onOpenChange={setIsProjectOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Toevoegen aan projectlijst</DialogTitle>
                        <DialogDescription>
                            Selecteer een bestaand project om dit materiaal aan toe te voegen.
                        </DialogDescription>
                    </DialogHeader>

                    {!addSuccess ? (
                        <div className="py-4">
                            <div className="space-y-4">
                                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors flex items-center justify-between group" onClick={handleAddToProject}>
                                    <div>
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">Renovatie Kantoorpand Utrecht</h4>
                                        <p className="text-sm text-muted-foreground">12 materialen bewaard</p>
                                    </div>
                                    <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                </div>

                                <Button variant="outline" className="w-full border-dashed">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nieuw project aanmaken
                                </Button>
                            </div>
                            {isAdding && (
                                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-md z-10 transition-all">
                                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Toegevoegd!</h3>
                            <p className="text-center text-muted-foreground">Verwerkt in Renovatie Kantoorpand Utrecht</p>
                        </div>
                    )}

                    {!addSuccess && (
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsProjectOpen(false)} disabled={isAdding}>
                                Sluiten
                            </Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog: Neem contact op met aanbieder */}
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Contactgegevens aanbieder</DialogTitle>
                        <DialogDescription>
                            Neem rechtstreeks contact op met de leverancier van dit materiaal.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">{item.source}</h4>
                                <p className="text-sm text-muted-foreground">Circulaire bouwmaterialen & sloop</p>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg bg-muted/50 p-4">
                            <div className="flex gap-3">
                                <div className="w-5 flex justify-center mt-0.5">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">085 - 123 4567</p>
                                    <p className="text-xs text-muted-foreground">Ma t/m Vr: 08:00 - 17:00</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-5 flex justify-center mt-0.5">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium">verkoop@circulair-voorbeeld.nl</p>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-5 flex justify-center mt-0.5">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Circulairweg 12</p>
                                    <p className="text-sm font-medium">1234 AB, Utrecht</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setIsContactOpen(false)}>
                            Sluiten
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
