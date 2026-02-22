import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Demo Store</h3>
                        <p className="text-gray-400">
                            Il tuo negozio online di qualità con spedizione
                            veloce e reso gratuito.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Categorie</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/category/shoes"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    Scarpe
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/category/hoodies"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    Felpe
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Legale</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    Termini di Servizio
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Demo Store. Tutti i diritti
                        riservati.
                    </p>
                </div>
            </div>
        </footer>
    );
}
