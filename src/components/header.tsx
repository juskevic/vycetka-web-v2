'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import localFont from 'next/font/local'

const digitalCards = localFont({
    src: [
        {
            path:"../../public/fonts/DigitalCards-Demo.ttf",
            weight: "400",
        }
    ]
})

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const NavItems = () => (
        <>
            <Link href="/changelog" className="text-sm font-medium transition-colors hover:text-primary">
                Historie změn
            </Link>
            <Link href="/privacy-policy" className="text-sm font-medium transition-colors hover:text-primary">
                Ochrana soukromí
            </Link>
        </>
    )

    return (
        <header className="flex justify-evenly sticky z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 justify-evenly">
                <Link className="flex items-center space-x-2" href="/">
                    <span className={`${digitalCards.className} hidden font-bold sm:inline-block`}>Výčetka</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <NavItems />
                </nav>

                <div className="flex items-center space-x-4">
                    <Button className="hidden md:inline-flex gap-2">
                        <Download className="h-4 w-4" />
                        Stáhnout
                    </Button>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                                onClick={toggleMenu}
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Otevřít menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <Link
                                href="/"
                                className="flex items-center"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="font-bold">Výčetka</span>
                            </Link>
                            <nav className="mt-6 flex flex-col space-y-4">
                                <NavItems />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}