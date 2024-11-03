import { Button } from "@/components/ui/button";
import {Stars, Download, ArrowRight} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
    return (
        <main className="space-y-40 py-16 px-4 md:px-6 lg:px-8">
            <div className="flex flex-col !text-center gap-8">
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-50 to-gray-200 bg-clip-text text-transparent">
                        {"Počítejte svou pokladnu efektivně a přesně."}
                    </h1>
                    <p className="text-xl text-gray-200">
                        {"S Výčetkou je počítání hotovosti hračka."}
                    </p>
                </div>
                <div className="flex flex-row justify-center gap-2">
                    <Button variant="default" className="rounded-full">
                        Stáhnout <Download size={25} />
                    </Button>
                    <Button variant="secondary" className="rounded-full">
                        Co je nového? <Stars size={25} />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                        src="/placeholder.svg"
                        alt="Výčetka app screenshot"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-gray-100 text-center md:text-left">
                        {"Stáhněte si Výčetku"}
                    </h2>
                    <Button disabled={true} variant="default" className="text-base rounded-full w-full md:w-auto">
                        Google Play <Download className="ml-2" size={20} />
                    </Button>
                    <Button disabled={true} variant="default" className="text-base rounded-full w-full md:w-auto">
                        App Store <Download className="ml-2" size={20} />
                    </Button>
                    <Button variant="outline" className="text-base rounded-full w-full md:w-auto">
                        Webová verze <ArrowRight size="20"/>
                    </Button>
                </div>
            </div>

        </main>
    )
}