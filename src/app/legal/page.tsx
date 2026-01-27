import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function LegalPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1 container py-16">
                <div className="max-w-3xl mx-auto prose prose-gray">
                    <h1>Legal & Disclaimer</h1>
                    <p className="lead">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}</p>

                    <hr />

                    <h3>1. Disclaimer Demo Versie</h3>
                    <p>
                        Dit platform ("Resource") bevindt zich in een Demo / Pilot fase.
                        Alle resultaten, inclusief maar niet beperkt tot match-scores, CO2-besparingen en prijsindicaties, zijn puur indicatief.
                    </p>
                    <p>
                        Er kunnen geen rechten worden ontleend aan de informatie op deze website.
                        Resource is niet aansprakelijk voor enige schade als gevolg van het gebruik van (onjuiste) informatie.
                    </p>

                    <h3>2. MPG-Ready Export</h3>
                    <p>
                        De term "MPG-ready" geeft aan dat de data-structuur compatibel is met gangbare rekeninstrumenten.
                        Het is <strong>geen</strong> officiële MPG-berekening. Een geldige MPG-berekening dient altijd te worden uitgevoerd en gevalideerd door een erkend adviseur met gecertificeerde software (bijv. GPR Gebouw, MPG Calc).
                    </p>

                    <h3>3. Bronvermelding en Factoren</h3>
                    <p>
                        Voor de indicatieve CO2-berekeningen maken wij gebruik van publiek beschikbare factoren (o.a. NMD (Categorie 3 indicaties) en ICE Database).
                    </p>

                    <h3>4. Privacy</h3>
                    <p>
                        <strong>Geüploade bestanden:</strong> In deze demo-omgeving worden geüploade bestanden <strong>niet permanent opgeslagen</strong> op onze servers.
                        De verwerking vindt plaats in het werkgeheugen of de browser, en data wordt na de sessie verwijderd.
                    </p>
                    <p>
                        <strong>Contactgegevens:</strong> Persoonsgegevens ingevuld op contactformulieren worden uitsluitend gebruikt om contact op te nemen over uw aanvraag en worden nooit gedeeld met derden zonder toestemming.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
