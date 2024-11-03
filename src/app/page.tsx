import {Button} from "@/components/ui/button";
import {ShieldQuestion, Stars} from "lucide-react";

export default function LandingPage() {
    return (
        <main>
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
                    <Button variant="outline" className="rounded-full">
                        Co je nového? <Stars size={20} />
                    </Button>
                    <Button variant="ghost" className="rounded-full">
                        Ochrana soukromí <ShieldQuestion size={20} />
                    </Button>
                </div>
            </div>
        </main>
    )
}