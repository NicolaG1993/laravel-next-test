import { api } from "@/services/api";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Demo Store - E-commerce di Qualità | Homepage",
    description:
        "Benvenuto in Demo Store. Scopri scarpe e abbigliamento di qualità con consegna veloce. Reso gratuito garantito.",
    keywords: ["e-commerce", "shopping", "scarpe", "abbigliamento", "demo"],
    alternates: {
        canonical: "http://localhost:3000",
    },
    openGraph: {
        title: "Demo Store - Homepage",
        description: "Scopri i prodotti demo del nostro e-commerce.",
        url: "http://localhost:3000",
        siteName: "Demo Store",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Demo Store Homepage",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Demo Store - Homepage",
        description: "Scopri i prodotti demo del nostro e-commerce.",
        images: ["/og-image.png"],
    },
};

export default async function Home() {
    try {
        // Usa l'API route locale di Next.js per SSR
        const categoryResponse = await fetch(
            "http://localhost:3000/api/categories",
            {
                cache: "no-store",
            },
        );

        if (!categoryResponse.ok) {
            throw new Error(`Backend error: ${categoryResponse.status}`);
        }

        const categories = await categoryResponse.json();

        return (
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <section className="bg-blue-600 text-white py-12 px-4">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Benvenuto in Demo Store
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90">
                            Scopri i migliori prodotti di qualità con consegna
                            veloce
                        </p>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-12 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Categorie Principali
                        </h2>

                        {categories.length === 0 ? (
                            <p className="text-center text-gray-500">
                                Nessuna categoria disponibile al momento.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((category: any) => (
                                    <article
                                        key={category.id}
                                        className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-40 flex items-center justify-center">
                                            <span className="text-white text-4xl">
                                                📦
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-bold mb-2">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {category.description}
                                            </p>
                                            <Link
                                                href={`/category/${category.slug}`}
                                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold"
                                            >
                                                Esplora Categoria →
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gray-100 py-12 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Perché Scegliere Demo Store?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <article className="bg-white p-6 rounded-lg text-center">
                                <div className="text-4xl mb-4">🚀</div>
                                <h3 className="text-xl font-bold mb-2">
                                    Consegna Veloce
                                </h3>
                                <p className="text-gray-600">
                                    Ricevi il tuo ordine entro 24-48 ore
                                    lavorative
                                </p>
                            </article>
                            <article className="bg-white p-6 rounded-lg text-center">
                                <div className="text-4xl mb-4">🛡️</div>
                                <h3 className="text-xl font-bold mb-2">
                                    Qualità Garantita
                                </h3>
                                <p className="text-gray-600">
                                    Tutti i prodotti sono controllati per la
                                    massima qualità
                                </p>
                            </article>
                            <article className="bg-white p-6 rounded-lg text-center">
                                <div className="text-4xl mb-4">↩️</div>
                                <h3 className="text-xl font-bold mb-2">
                                    Reso Gratuito
                                </h3>
                                <p className="text-gray-600">
                                    Puoi restituire i prodotti entro 30 giorni
                                    gratuitamente
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>
        );
    } catch (error) {
        console.error("Errore nel caricamento:", error);
        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">
                    Errore nel caricamento
                </h1>
                <p className="text-gray-600">
                    Si è verificato un errore nel caricamento della pagina. Per
                    favore, ricarica la pagina.
                </p>
            </main>
        );
    }
}
