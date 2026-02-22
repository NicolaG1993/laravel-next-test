import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        Demo Store
                    </Link>
                    <ul className="flex gap-6">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-blue-600 transition font-medium"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/category/shoes"
                                className="text-gray-700 hover:text-blue-600 transition font-medium"
                            >
                                Scarpe
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/category/hoodies"
                                className="text-gray-700 hover:text-blue-600 transition font-medium"
                            >
                                Felpe
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-blue-600 transition font-medium"
                            >
                                Contatti
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
