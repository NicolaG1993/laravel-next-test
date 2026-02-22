import { NextResponse } from "next/server";

const mockCategories = [
    {
        id: 1,
        name: "Shoes",
        slug: "shoes",
        description: "Scarpe di qualità premium per ogni occasione",
    },
    {
        id: 2,
        name: "Hoodies",
        slug: "hoodies",
        description: "Felpe comode e stylish per il tuo guardaroba",
    },
];

export async function GET() {
    return NextResponse.json(mockCategories);
}
