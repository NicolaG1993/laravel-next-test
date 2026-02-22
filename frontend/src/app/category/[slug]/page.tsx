import { Metadata } from "next";

interface CategoryPageProps {
    params: { slug: string };
}

// Genera percorsi statici per le categorie
export async function generateStaticParams() {
    try {
        const categoryResponse = await fetch(
            "http://localhost:3000/api/categories",
            {
                cache: "no-store",
            },
        );

        if (!categoryResponse.ok) {
            throw new Error(`API error: ${categoryResponse.status}`);
        }

        const categories = await categoryResponse.json();

        return categories.map((cat: any) => ({
            slug: cat.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

// SEO per ogni categoria
export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const resolvedParams = await params;

    if (!resolvedParams?.slug) {
        return {
            title: "Demo Store - Categoria",
            description: "Scopri i prodotti disponibili.",
        };
    }

    // Mappa slug a nomi leggibili
    const slugToName: { [key: string]: string } = {
        shoes: "Scarpe",
        scarpe: "Scarpe",
        hoodies: "Felpe",
        felpe: "Felpe",
    };

    const slug = resolvedParams.slug;
    const categoryName =
        slugToName[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);

    return {
        title: `Demo Store - Categoria ${categoryName}`,
        description: `Scopri i prodotti della categoria ${categoryName}.`,
        alternates: {
            canonical: `http://localhost:3000/category/${slug}`,
        },
        openGraph: {
            title: `Categoria ${categoryName} - Demo Store`,
            description: `Scopri i prodotti della categoria ${categoryName}.`,
            url: `http://localhost:3000/category/${slug}`,
            siteName: "Demo Store",
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: `Demo Store Categoria ${categoryName}`,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Categoria ${categoryName} - Demo Store`,
            description: `Scopri i prodotti della categoria ${categoryName}.`,
            images: ["/og-image.png"],
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
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

        // Unwrap params and mappa slug a category_id
        const resolvedParams = await params;
        const slug = resolvedParams?.slug;

        const slugToCategoryId: { [key: string]: number } = {
            shoes: 1,
            scarpe: 1,
            hoodies: 2,
            felpe: 2,
        };

        const categoryId = slugToCategoryId[slug] || 1;
        const categoryProducts = products.filter(
            (p: any) => p.category_id === categoryId,
        );

        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Categoria: {slug}</h1>
                {categoryProducts.length === 0 ? (
                    <p className="text-gray-500">
                        Nessun prodotto in questa categoria
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryProducts.map((p: any) => (
                            <article
                                key={p.id}
                                className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-40 flex items-center justify-center">
                                    <span className="text-blue-400 text-4xl">
                                        📦
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">
                                        {p.name}
                                    </h2>
                                    <p className="text-gray-600 mb-2 text-sm">
                                        {p.description}
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600 mb-4">
                                        €{p.price.toFixed(2)}
                                    </p>
                                    <a
                                        href={`/product/${p.slug}`}
                                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        Vedi Dettagli
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        );
    } catch (error) {
        console.error("Error loading products:", error);
        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">
                    Errore nel caricamento
                </h1>
                <p className="text-gray-600">
                    Si è verificato un errore nel caricamento dei prodotti. Per
                    favore, ricarica la pagina.
                </p>
            </main>
        );
    }
}
