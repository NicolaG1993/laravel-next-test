<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Mock data con informazioni SEO-friendly
    private $categories = [
        ["id" => 1, "name" => "Shoes", "slug" => "shoes", "description" => "Scarpe di qualità premium per ogni occasione"],
        ["id" => 2, "name" => "Hoodies", "slug" => "hoodies", "description" => "Felpe comode e stylish per il tuo guardaroba"]
    ];

    private $products = [
        [
            "id" => 1,
            "name" => "Nike Air Max 90",
            "slug" => "nike-air-max-90",
            "category_id" => 1,
            "description" => "Scarpe sportive iconiche con tecnologia Air cushioning per il massimo comfort.",
            "price" => 129.99,
            "image" => "/products/nike-air-max-90.jpg",
            "seoTitle" => "Nike Air Max 90 - Scarpe Sportive Originali | Demo Store",
            "seoDescription" => "Acquista le iconiche Nike Air Max 90. Comfort premium e stile unico. Consegna veloce."
        ],
        [
            "id" => 2,
            "name" => "Adidas Hoodie Classic",
            "slug" => "adidas-hoodie-classic",
            "category_id" => 2,
            "description" => "Felpa Adidas classica, perfetta per il casual e lo sport.",
            "price" => 79.99,
            "image" => "/products/adidas-hoodie.jpg",
            "seoTitle" => "Felpa Adidas Classic - Hoodie Premium | Demo Store",
            "seoDescription" => "Felpa Adidas di qualità premium. Tessuto morbido e resistente. Acquista online oggi."
        ],
        [
            "id" => 3,
            "name" => "Puma Running Shoe",
            "slug" => "puma-running-shoe",
            "category_id" => 1,
            "description" => "Scarpa da corsa leggera con ammortizzazione avanzata.",
            "price" => 109.99,
            "image" => "/products/puma-running.jpg",
            "seoTitle" => "Scarpa Puma Running - Performance | Demo Store",
            "seoDescription" => "Scarpa running Puma con tecnologia di ammortizzazione. Perfetta per atleti."
        ],
        [
            "id" => 4,
            "name" => "Nike Zip Hoodie",
            "slug" => "nike-zip-hoodie",
            "category_id" => 2,
            "description" => "Felpa Nike con cerniera, ideale per il layering.",
            "price" => 89.99,
            "image" => "/products/nike-hoodie.jpg",
            "seoTitle" => "Felpa Nike Zip - Comfort & Stile | Demo Store",
            "seoDescription" => "Felpa Nike con zip. Perfetta per ogni stagione. Ordina online con spedizione gratuita."
        ]
    ];

    // Lista delle categorie
    public function categories()
    {
        return response()->json($this->categories);
    }

    // Lista dei prodotti con filtro per categoria
    public function products(Request $request)
    {
        $categoryId = $request->query('category_id');
        $allProducts = $this->products;

        if ($categoryId) {
            $allProducts = array_filter($allProducts, fn($p) => $p['category_id'] == $categoryId);
        }

        return response()->json(array_values($allProducts));
    }

    // Singolo prodotto
    public function product($id)
    {
        $product = collect($this->products)->firstWhere('id', $id);

        if (!$product) {
            return response()->json(["error" => "Prodotto non trovato"], 404);
        }

        return response()->json($product);
    }
}