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
    {
        id: 5,
        name: "New Balance 574",
        slug: "new-balance-574",
        category_id: 1,
        description: "Scarpe classiche con design retrò e massimo comfort.",
        price: 99.99,
        image: "/products/new-balance-574.jpg",
        seoTitle: "New Balance 574 - Scarpe Classiche | Demo Store",
        seoDescription:
            "Le iconiche New Balance 574. Comfort e stile senza compromessi.",
    },
    {
        id: 6,
        name: "Converse Chuck Taylor",
        slug: "converse-chuck-taylor",
        category_id: 1,
        description: "Sneaker leggende, perfette per ogni occasione.",
        price: 69.99,
        image: "/products/converse-chuck.jpg",
        seoTitle: "Converse Chuck Taylor - Sneaker Leggenda | Demo Store",
        seoDescription:
            "Le Converse Chuck Taylor originali. Stile inconfondibile dal 1917.",
    },
    {
        id: 7,
        name: "Carhartt Hoodie",
        slug: "carhartt-hoodie",
        category_id: 2,
        description:
            "Felpa robusta e confortevole, perfetta per il lavoro e il tempo libero.",
        price: 69.99,
        image: "/products/carhartt-hoodie.jpg",
        seoTitle: "Carhartt Hoodie - Felpa Robusta | Demo Store",
        seoDescription:
            "Felpa Carhartt di qualità industriale. Duratura e confortevole.",
    },
    {
        id: 8,
        name: "Champion Hoodie",
        slug: "champion-hoodie",
        category_id: 2,
        description: "Felpa morbida e classica, icona dello stile sportivo.",
        price: 59.99,
        image: "/products/champion-hoodie.jpg",
        seoTitle: "Champion Hoodie - Classico Sportivo | Demo Store",
        seoDescription:
            "Felpa Champion originale. Comfort e qualità garantiti.",
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category_id");

    let products = mockProducts;

    if (categoryId) {
        products = products.filter(
            (p) => p.category_id === parseInt(categoryId),
        );
    }

    return NextResponse.json(products);
}
