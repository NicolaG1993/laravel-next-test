import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contatti - Demo Store",
    description: "Contattaci per informazioni sulla Demo Store.",
    alternates: {
        canonical: "http://localhost:3000/contact",
    },
    openGraph: {
        title: "Contatti - Demo Store",
        description: "Contattaci per informazioni sulla Demo Store.",
        url: "http://localhost:3000/contact",
        siteName: "Demo Store",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Contatti Demo Store",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contatti - Demo Store",
        description: "Contattaci per informazioni sulla Demo Store.",
        images: ["/og-image.png"],
    },
};

export default function ContactPage() {
    return (
        <main>
            <h1>Contatti</h1>
            <p>Scrivici per informazioni o richieste sulla Demo Store.</p>
            <form>
                <label>
                    Nome:
                    <br />
                    <input type="text" name="name" />
                </label>
                <br />
                <label>
                    Email:
                    <br />
                    <input type="email" name="email" />
                </label>
                <br />
                <label>
                    Messaggio:
                    <br />
                    <textarea name="message" />
                </label>
                <br />
                <button type="submit">Invia</button>
            </form>
        </main>
    );
}
