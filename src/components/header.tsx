'use client'

import Link from 'next/link'
import {ArrowRight, Download} from 'lucide-react'
import {Button} from '@/components/ui/button'
import localFont from 'next/font/local'

const digitalCards = localFont({
    src: [
        {
            path: "../../public/fonts/DigitalCards-Demo.ttf",
            weight: "400",
        }
    ]
})

export default function Header() {

    return (
        <header>
            <div className="sticky z-50 flex flex-row justify-evenly p-3 bg-black">
                <div className="flex flex-rowjustify-start">
                    <Link href="/" className={`${digitalCards.className} text-lg font-bold my-auto`}>Výčetka</Link>
                </div>
                <div className="flex flex-row justify-end my-auto gap-2">
                    <Button variant="default" size="default" className="rounded-full">
                        Stáhnout <Download size="20"/>
                    </Button>
                    <Button variant="secondary" size="default" className="rounded-full">
                        Webová verze <ArrowRight size="20"/>
                    </Button>
                </div>
            </div>
        </header>
    )
}