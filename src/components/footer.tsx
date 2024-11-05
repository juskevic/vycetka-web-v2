import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex flex-col items-center space-x-2">
                        <Link href="https://juskevic.com/" target="_blank">
                            <Image
                                src="/juskevic_trademark.webp"
                                alt="Juskevic Logo"
                                width={50}
                                height={50}
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                        <p className="text-sm text-muted-foreground">
                        © {currentYear} Max Juškevič. Všechna práva vyhrazena.
                        </p>
                        <nav className="flex gap-4 text-sm">
                            <Link href="/privacy" className="underline text-muted-foreground hover:text-primary">
                                Ochrana osobních údajů
                            </Link>
                            <Link href="/changelog" className="underline text-muted-foreground hover:text-primary">
                                Seznam změn
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}