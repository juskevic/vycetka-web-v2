'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import localFont from 'next/font/local'
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {ArrowRight, Loader2, House} from "lucide-react";

const digitalCards = localFont({
    src: [
        {
            path: "../../public/fonts/DigitalCards-Demo.ttf",
            weight: "400",
        }
    ]
})

export default function Header() {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleButtonPress = () => {
        startTransition(() => {
            router.push('/vycetka');
        });
    };

    const handleHomeButtonPress = () => {
        startTransition(() => {
            router.push('/');
        }
        )
    }

    return (
        <header className="fixed sm:block z-50 w-full bg-black border-b border-b-secondary">
            <div className="sticky z-50 flex flex-row justify-end sm:justify-evenly p-3">
                <div className="hidden sm:flex flex-rowjustify-start">
                    <Link href="/" className={`${digitalCards.className} text-lg font-bold my-auto`}>Výčetka</Link>
                </div>
                <div className="flex flex-row justify-end my-auto gap-2">
                    <Button onClick={handleHomeButtonPress} variant="outline" size="icon" className="sm:hidden flex rounded-full">
                        <House />
                    </Button>
                    <Button
                        onClick={handleButtonPress}
                        variant={isPending ? "secondary" : "outline"}
                        className="rounded-full">
                        {isPending ? "Načítání" : "Webová verze"} {isPending ? <Loader2 className="animate-spin" /> : <ArrowRight size="20"/>}
                    </Button>
                </div>
            </div>
        </header>
    )
}