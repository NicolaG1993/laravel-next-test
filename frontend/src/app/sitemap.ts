import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "http://localhost:3000";

    const categories = [
        { id: 1, slug: "shoes" },
        { id: 2, slug: "hoodies" },
    ];

    const products = [
        { id: 1, slug: "nike-air-max-90" },
        { id: 2, slug: "adidas-hoodie-classic" },
        { id: 3, slug: "puma-running-shoe" },
        { id: 4, slug: "nike-zip-hoodie" },
    ];

    return [
        // Homepage
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        // Categorie
        ...categories.map((cat) => ({
            url: `${baseUrl}/category/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
        // Prodotti
        ...products.map((prod) => ({
            url: `${baseUrl}/product/${prod.id}/${prod.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
    ];
}
