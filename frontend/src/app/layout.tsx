import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
    metadataBase: new URL("http://localhost:3000"),
    title: "Demo Store - E-commerce SEO Demo",
    description:
        "Demo di Next.js con backend Laravel. Pagine statiche, prerendering e SEO ottimizzato.",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "Demo Store",
        description: "Next.js + Laravel SEO demo",
        url: "http://localhost:3000",
        siteName: "Demo Store",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Demo Store",
            },
        ],
        locale: "it_IT",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Demo Store",
        description: "Next.js + Laravel SEO demo",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "http://localhost:3000",
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="it" className="light">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="canonical" href="http://localhost:3000" />
            </head>
            <body className="flex flex-col min-h-screen bg-white">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
