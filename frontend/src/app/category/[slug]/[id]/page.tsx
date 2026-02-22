import { Metadata } from "next";
import Link from "next/link";

interface ProductDetailPageProps {
    params: { slug: string; id: string };
}

// Genera percorsi dinamici per i singoli prodotti
export async function generateStaticParams() {
    try {
        const productsResponse = await fetch(
            "http://localhost:3000/api/products",
            {
                cache: "no-store",
            },
        );

        if (!productsResponse.ok) {
            throw new Error(`API error: ${productsResponse.status}`);
        }

        const products = await productsResponse.json();

        // Genera percorsi per ogni prodotto in ogni categoria
        const params: { slug: string; id: string }[] = [];

        for (const product of products) {
            if (product.category?.slug) {
                params.push({
                    slug: product.category.slug,
                    id: product.id.toString(),
                });
            }
        }

        return params;
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

// SEO per ogni prodotto
export async function generateMetadata({
    params,
}: ProductDetailPageProps): Promise<Metadata> {
    const resolvedParams = await params;

    try {
        const response = await fetch(
            `http://localhost:3000/api/products/${resolvedParams.id}`,
            {
                cache: "no-store",
            },
        );

        if (!response.ok) {
            return {
                title: "Prodotto Non Trovato",
                description: "Il prodotto non esiste.",
            };
        }

        const product = await response.json();

        return {
            title: `${product.name} | Demo Store`,
            description:
                product.description ||
                `Scopri ${product.name} nella nostra collezione.`,
            openGraph: {
                title: product.name,
                description: product.description,
                url: `/category/${resolvedParams.slug}/${resolvedParams.id}`,
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Dettagli Prodotto",
            description: "Scopri i dettagli del prodotto.",
        };
    }
}

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    const resolvedParams = await params;

    try {
        const response = await fetch(
            `http://localhost:3000/api/products/${resolvedParams.id}`,
            {
                cache: "no-store",
            },
        );

        if (!response.ok) {
            return (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">
                        Prodotto Non Trovato
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Il prodotto che stai cercando non esiste.
                    </p>
                    <Link
                        href={`/category/${resolvedParams.slug}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        Torna alla categoria
                    </Link>
                </div>
            );
        }

        const product = await response.json();

        return (
            <div className="container mx-auto px-4 py-8">
                <Link
                    href={`/category/${resolvedParams.slug}`}
                    className="text-blue-600 hover:text-blue-800 underline mb-6 inline-block"
                >
                    ← Torna a {resolvedParams.slug}
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-64">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-w-full max-h-96 object-contain"
                            />
                        ) : (
                            <div className="text-gray-400">No image</div>
                        )}
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 text-lg mb-4">
                            Categoria:{" "}
                            <span className="font-semibold">
                                {product.category?.name || "N/A"}
                            </span>
                        </p>

                        <p className="text-3xl font-bold text-green-600 mb-6">
                            €{parseFloat(product.price || 0).toFixed(2)}
                        </p>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {product.description ||
                                "Nessuna descrizione disponibile."}
                        </p>

                        {product.stock !== undefined && (
                            <div className="mb-6">
                                <p className="text-sm font-semibold text-gray-600">
                                    Disponibilità:
                                </p>
                                <p
                                    className={`text-lg font-bold ${
                                        product.stock > 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {product.stock > 0
                                        ? `${product.stock} disponibili`
                                        : "Esaurito"}
                                </p>
                            </div>
                        )}

                        <button
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                                product.stock > 0
                                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={product.stock <= 0}
                        >
                            {product.stock > 0
                                ? "Aggiungi al Carrello"
                                : "Non Disponibile"}
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching product:", error);

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Errore</h1>
                <p className="text-gray-600 mb-6">
                    Si è verificato un errore nel caricamento del prodotto.
                </p>
                <Link
                    href={`/category/${resolvedParams.slug}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    Torna alla categoria
                </Link>
            </div>
        );
    }
}
