import { NextResponse } from "next/server";

const mockProducts = [
    {
        id: 1,
        name: "Nike Air Max 90",
        slug: "nike-air-max-90",
        category_id: 1,
        description:
            "Scarpe sportive iconiche con tecnologia Air cushioning per il massimo comfort.",
        price: 129.99,
        image: "/products/nike-air-max-90.jpg",
        seoTitle: "Nike Air Max 90 - Scarpe Sportive Originali | Demo Store",
        seoDescription:
            "Acquista le iconiche Nike Air Max 90. Comfort premium e stile unico. Consegna veloce.",
    },
    {
        id: 2,
        name: "Adidas Hoodie Classic",
        slug: "adidas-hoodie-classic",
        category_id: 2,
        description:
            "Felpa Adidas classica, perfetta per il casual e lo sport.",
        price: 79.99,
        image: "/products/adidas-hoodie.jpg",
        seoTitle: "Felpa Adidas Classic - Hoodie Premium | Demo Store",
        seoDescription:
            "Felpa Adidas di qualità premium. Tessuto morbido e resistente. Acquista online oggi.",
    },
    {
        id: 3,
        name: "Puma Running Shoe",
        slug: "puma-running-shoe",
        category_id: 1,
        description: "Scarpa da corsa leggera con ammortizzazione avanzata.",
        price: 109.99,
        image: "/products/puma-running.jpg",
        seoTitle: "Scarpa Puma Running - Performance | Demo Store",
        seoDescription:
            "Scarpa running Puma con tecnologia di ammortizzazione. Perfetta per atleti.",
    },
    {
        id: 4,
        name: "Nike Zip Hoodie",
        slug: "nike-zip-hoodie",
        category_id: 2,
        description: "Felpa Nike con cerniera, ideale per il layering.",
        price: 89.99,
        image: "/products/nike-hoodie.jpg",
        seoTitle: "Felpa Nike Zip - Comfort & Stile | Demo Store",
        seoDescription:
            "Felpa Nike con zip. Perfetta per ogni stagione. Ordina online con spedizione gratuita.",
    },
];

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);
    const product = mockProducts.find((p) => p.id === productId);

    if (!product) {
        return NextResponse.json(
            { error: "Prodotto non trovato" },
            { status: 404 },
        );
    }

    return NextResponse.json(product);
}
