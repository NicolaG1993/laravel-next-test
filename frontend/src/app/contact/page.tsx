"use client";

import { Metadata } from "next";
import { useState } from "react";
import styles from "./contact.module.css";

// export const metadata: Metadata = {
//     title: "Contatti - Demo Store",
//     description: "Contattaci per informazioni sulla Demo Store.",
//     alternates: {
//         canonical: "http://localhost:3000/contact",
//     },
//     openGraph: {
//         title: "Contatti - Demo Store",
//         description: "Contattaci per informazioni sulla Demo Store.",
//         url: "http://localhost:3000/contact",
//         siteName: "Demo Store",
//         images: [
//             {
//                 url: "/og-image.png",
//                 width: 1200,
//                 height: 630,
//                 alt: "Contatti Demo Store",
//             },
//         ],
//         type: "website",
//     },
//     twitter: {
//         card: "summary_large_image",
//         title: "Contatti - Demo Store",
//         description: "Contattaci per informazioni sulla Demo Store.",
//         images: ["/og-image.png"],
//     },
// };

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error"
    >("idle");

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Il nome è obbligatorio";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Il nome deve avere almeno 2 caratteri";
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email è obbligatoria";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Inserisci un'email valida";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "L'oggetto è obbligatorio";
        } else if (formData.subject.trim().length < 5) {
            newErrors.subject = "L'oggetto deve avere almeno 5 caratteri";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Il messaggio è obbligatorio";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Il messaggio deve avere almeno 10 caratteri";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // TODO: Backend - Implementare endpoint POST /api/contact
            // che riceva i seguenti dati:
            // {
            //   name: string,
            //   email: string,
            //   subject: string,
            //   message: string
            // }
            //
            // Checklist:
            // - Validare i dati lato backend
            // - Salvare il messaggio nel database (tabella: contacts)
            // - Inviare email di notifica all'admin
            // - Inviare email di conferma all'utente
            // - Implementare rate limiting (max 5 messaggi per ora per IP)
            // - Aggiungere CSRF protection

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Errore nell'invio del messaggio");
            }

            setSubmitStatus("success");
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus("idle");
            }, 5000);
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");

            // Reset error message after 5 seconds
            setTimeout(() => {
                setSubmitStatus("idle");
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Contatti</h1>
                    <p>
                        Scrivici per informazioni o richieste sulla Demo Store.
                        Ti risponderemo il prima possibile.
                    </p>
                </div>

                <div className={styles.formWrapper}>
                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}
                        noValidate
                    >
                        {submitStatus === "success" && (
                            <div className={styles.successMessage}>
                                ✓ Messaggio inviato con successo! Ti
                                contatteremo presto.
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className={styles.errorMessage}>
                                ✗ Errore nell'invio del messaggio. Riprova più
                                tardi.
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nome *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? styles.inputError : ""}
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <span className={styles.fieldError}>
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={
                                    errors.email ? styles.inputError : ""
                                }
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <span className={styles.fieldError}>
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="subject">Oggetto *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={
                                    errors.subject ? styles.inputError : ""
                                }
                                disabled={isSubmitting}
                            />
                            {errors.subject && (
                                <span className={styles.fieldError}>
                                    {errors.subject}
                                </span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Messaggio *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                className={
                                    errors.message ? styles.inputError : ""
                                }
                                disabled={isSubmitting}
                            />
                            {errors.message && (
                                <span className={styles.fieldError}>
                                    {errors.message}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Invio in corso..."
                                : "Invia Messaggio"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
