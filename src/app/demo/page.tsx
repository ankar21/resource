import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UploadWidget } from "@/components/demo/upload-widget";

export default function DemoPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />

            <main className="flex-1 container py-16 md:py-24">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Upload je materiaalstaat
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Resource accepteert standaard Excel of CSV bestanden.
                        We herkennen automatisch kolommen zoals materiaal, hoeveelheid en eenheid.
                    </p>
                </div>

                <UploadWidget />
            </main>

            <Footer />
        </div>
    );
}
