import { NextResponse } from "next/server";

// TODO: Backend - Implementare l'endpoint reale nel Laravel backend
//
// Questo è un placeholder per il frontend.
// L'implementazione reale andrà in backend/routes/api.php o in un controller Laravel
//
// Specifica tecniche:
// 1. Endpoint: POST /api/contact
// 2. Validazione:
//    - name: required, string, max:255, min:2
//    - email: required, email, max:255
//    - subject: required, string, max:255, min:5
//    - message: required, string, min:10, max:5000
// 3. Salvataggio:
//    - Creare tabella migrations: contacts (id, name, email, subject, message, ip_address, created_at)
//    - Modello: Contact
// 4. Notifiche:
//    - Email all'admin (indirizzo configurabile)
//    - Email di conferma all'utente
// 5. Sicurezza:
//    - Rate limiting: max 5 messaggi per ora per IP
//    - CSRF protection (Next.js gestisce automaticamente con middleware)
//    - Sanitizzazione input
//    - Validazione server-side
// 6. Logging:
//    - Log tutti i messaggi inviati
//    - Log errori di invio email

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // TODO: Inviare a Laravel backend
        // const response = await fetch('http://localhost:8000/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(body),
        // });
        //
        // if (!response.ok) {
        //     throw new Error('Backend error');
        // }

        return NextResponse.json(
            {
                message:
                    "Messaggio ricevuto. Implementare backend per salvare.",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Errore nell'elaborazione del messaggio" },
            { status: 500 },
        );
    }
}
