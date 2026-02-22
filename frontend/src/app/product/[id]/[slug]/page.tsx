import { api } from "@/services/api";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
    params: {
        id: string;
        slug: string;
    };
}

// Generiamo metadata dinamico per il prodotto
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    try {
        const { data: product } = await api.get(`/products/${params.id}`);

        return {
            title: product.seoTitle || `${product.name} - Demo Store`,
            description: product.seoDescription || product.description,
            alternates: {
                canonical: `http://localhost:3000/product/${params.id}/${params.slug}`,
            },
            openGraph: {
                title: product.seoTitle || product.name,
                description: product.seoDescription || product.description,
                url: `http://localhost:3000/product/${params.id}/${params.slug}`,
                siteName: "Demo Store",
                images: [
                    {
                        url: product.image || "/placeholder.jpg",
                        width: 800,
                        height: 800,
                        alt: product.name,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: product.seoTitle || product.name,
                description: product.seoDescription || product.description,
                images: [product.image || "/placeholder.jpg"],
            },
        };
    } catch (error) {
        return {
            title: "Prodotto non trovato",
            description: "Il prodotto che stai cercando non esiste.",
        };
    }
}

export default async function ProductPage({ params }: PageProps) {
    try {
        const { data: product } = await api.get(`/products/${params.id}`);

        // Verifichiamo che lo slug corrisponda
        if (product.slug !== params.slug) {
            return (
                <main className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">
                        Prodotto non trovato
                    </h1>
                    <Link href="/" className="text-blue-600 hover:underline">
                        Torna alla homepage
                    </Link>
                </main>
            );
        }

        return (
            <main className="container mx-auto px-4 py-8">
                <nav className="mb-6">
                    <Link href="/" className="text-blue-600 hover:underline">
                        Home
                    </Link>
                    <span className="mx-2">›</span>
                    <Link
                        href={`/category/${product.category_id === 1 ? "shoes" : "hoodies"}`}
                        className="text-blue-600 hover:underline"
                    >
                        {product.category_id === 1 ? "Shoes" : "Hoodies"}
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="text-gray-600">{product.name}</span>
                </nav>

                <article className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img
                            src={product.image || "/placeholder.jpg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-4">
                            {product.name}
                        </h1>

                        <div className="mb-6">
                            <span className="text-3xl font-bold text-green-600">
                                €{product.price?.toFixed(2) || "N/A"}
                            </span>
                        </div>

                        <p className="text-gray-700 text-lg mb-6">
                            {product.description}
                        </p>

                        <div className="mb-8">
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
                                Aggiungi al Carrello
                            </button>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-semibold mb-2">
                                Caratteristiche:
                            </h3>
                            <ul className="list-disc list-inside text-gray-600">
                                <li>Qualità premium garantita</li>
                                <li>Spedizione veloce</li>
                                <li>Reso gratuito entro 30 giorni</li>
                                <li>Garanzia soddisfazione al 100%</li>
                            </ul>
                        </div>
                    </div>
                </article>

                <section className="border-t pt-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Descrizione Dettagliata
                    </h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-gray-600 text-sm">
                        Ultimo aggiornamento:{" "}
                        {new Date().toLocaleDateString("it-IT")}
                    </p>
                </section>
            </main>
        );
    } catch (error) {
        console.error("Errore nel caricamento del prodotto:", error);
        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Errore</h1>
                <p className="text-gray-600 mb-4">
                    Si è verificato un errore nel caricamento del prodotto.
                </p>
                <Link href="/" className="text-blue-600 hover:underline">
                    Torna alla homepage
                </Link>
            </main>
        );
    }
}
