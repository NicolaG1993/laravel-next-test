import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const response = await fetch(
            `http://localhost:8000/api/products/${resolvedParams.id}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        const product = await response.json();

        // Redirect permanente (301) verso la rotta con slug
        return NextResponse.redirect(
            `${request.nextUrl.origin}/product/${resolvedParams.id}/${product.slug}`,
            { status: 301 }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
