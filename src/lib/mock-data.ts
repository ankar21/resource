export interface MatchedItem {
    id: string;
    originalMaterial: string;
    originalAmount: number;
    unit: string;
    matchedMaterial: string;
    matchScore: number; // 0-100
    source: string;
    location: string;
    distanceKm: number;
    priceIndication: number;
    co2SavingKg: number;
    lastUpdated: string;
    status: "available" | "reserved" | "sold";
}

const LOCATIONS = ["Amsterdam", "Rotterdam", "Utrecht", "Amersfoort", "Almere", "Zwolle", "Tilburg", "Groningen"];
const SOURCES = ["Buurman", "Oogstkaart", "Marktplaats Zakelijk", "Gebruiktebouwmaterialen.com", "Sloopcheck"];

export function generateMockMatches(sourceMode: string): MatchedItem[] {
    // If sourceMode is 'sample', we generate specific looking matches for the sample file
    // Otherwise random generic Construction matches

    const sampleItems = [
        { name: "Balkhout vuren", amount: 120, unit: "m1", co2: 150 },
        { name: "Gipsplaat 12.5mm", amount: 50, unit: "m2", co2: 200 },
        { name: "Baksteen metselwerk", amount: 2500, unit: "stuks", co2: 800 },
        { name: "Isolatie steenwol", amount: 80, unit: "m2", co2: 350 },
        { name: "Kozijn hout", amount: 4, unit: "stuks", co2: 400 },
        { name: "Deur stomp", amount: 6, unit: "stuks", co2: 180 },
        { name: "Betontegels 30x30", amount: 40, unit: "m2", co2: 600 },
        { name: "Zink regenpijp", amount: 12, unit: "m1", co2: 45 },
        { name: "Staalprofiel HEA140", amount: 2, unit: "stuks", co2: 1200 },
        { name: "Tapijttegels", amount: 60, unit: "m2", co2: 300 }
    ];

    const itemsToMap = sourceMode === 'sample' ? sampleItems : sampleItems.slice(0, 5); // Fallback for other files

    return itemsToMap.map((item, index) => {
        const isPerfect = Math.random() > 0.3;
        const matchScore = isPerfect ? 95 + Math.floor(Math.random() * 5) : 60 + Math.floor(Math.random() * 30);

        return {
            id: `match-${index}`,
            originalMaterial: item.name,
            originalAmount: item.amount,
            unit: item.unit,
            matchedMaterial: isPerfect ? `Gebruikt ${item.name}` : `Alternatief: ${item.name} (Reclaimed)`,
            matchScore: matchScore,
            source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
            location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
            distanceKm: Math.floor(Math.random() * 150),
            priceIndication: Math.floor(Math.random() * 500) + 50,
            co2SavingKg: item.co2,
            lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 100000000)).toISOString().split('T')[0],
            status: "available"
        };
    });
}
