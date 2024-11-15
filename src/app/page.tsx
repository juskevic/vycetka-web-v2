'use client';
import { Button } from "@/components/ui/button";
import {Download, ArrowRight, CheckCircle, User, Info} from "lucide-react";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export default function LandingPage() {

    const handleScrollToSection = () => {
        const element = document.getElementById('download');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll animation
        }
    };

    return (
        <main className="space-y-40 py-16 px-4 md:px-6 lg:px-8">
            <div className="flex flex-col !text-center gap-8 xl:pt-20">
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-50 to-gray-200 bg-clip-text text-transparent">
                        {"Počítejte svou pokladnu efektivně a přesně."}
                    </h1>
                    <p className="text-xl text-gray-200">
                        {"S Výčetkou je počítání hotovosti hračka."}
                    </p>
                </div>
                <div className="flex flex-row justify-center gap-2">
                    <Button onClick={handleScrollToSection} variant="default" className="rounded-full">
                        Stáhnout <Download size={25}/>
                    </Button>
                    <Button variant="secondary" className="rounded-full">
                        Webová verze <ArrowRight size="20"/>
                    </Button>
                </div>
            </div>

            <div className="space-y-12">
                <div className="flex flex-row justify-evenly flex-wrap gap-12">
                    {[
                        {
                            name: "Jan Novák",
                            role: "Majitel obchodu",
                            quote: "Výčetka mi ušetřila hodiny práce. Teď zvládnu uzávěrku za pár minut!",
                        },
                        {
                            name: "Marie Svobodová",
                            role: "Účetní",
                            quote: "S Výčetkou je kontrola hotovosti hračka. Doporučuji všem kolegům v oboru.",
                        },
                        {
                            name: "Petr Dvořák",
                            role: "Manažer restaurace",
                            quote: "Skvělá aplikace, která zjednodušila naše finanční operace!",
                        },
                    ].map((testimonial, index) => (
                        <Card key={index} className="w-96 bg-transparent">
                            <CardHeader className="flex">
                                <p className="text-primary italic">{`"${testimonial.quote}"`}</p>
                            </CardHeader>
                            <CardContent className="flex flex-row">
                                <User className="w-7 h-7 text-gray-200 mr-3 my-auto"/>
                                <div>
                                    <CardTitle className="text-primary text-xl">{testimonial.name}</CardTitle>
                                    <CardDescription className="text-gray-300">{testimonial.role}</CardDescription>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-100">
                    S Výčetkou už kalkulačku nepotřebujete
                </h2>
                <p className="text-xl text-gray-200">
                    Počítejte hotovost rychle a bez chyb. Ušetřete čas a zjednodušte si správu financí – s Výčetkou je
                    to snadné a spolehlivé.
                </p>
            </div>

            <div id="download" className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                        src="/placeholder.svg"
                        alt="Výčetka app screenshot"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col gap-4 !justify-center">
                    <Alert className="md:w-2/3 w-full border-orange-300 text-orange-300">
                        <Info className="!text-orange-300" size="20"/>
                        <AlertTitle>Closed Testing</AlertTitle>
                        <AlertDescription>
                            V současné době probíhá uzavřené testování pro Google Play a App Store.
                        </AlertDescription>
                    </Alert>
                    <h2 className="text-2xl font-bold text-gray-100 text-center w-full md:w-2/3">
                        {"Stáhněte si Výčetku"}
                    </h2>
                    <Button disabled={true} variant="default" className="text-base rounded-full w-full md:w-2/3">
                        Google Play <Download className="ml-2" size={20}/>
                    </Button>
                    <Button disabled={true} variant="default" className="text-base rounded-full w-full md:w-2/3">
                        App Store <Download className="ml-2" size={20}/>
                    </Button>
                    <Button variant="outline" className="text-base rounded-full w-full md:w-2/3">
                        Webová verze <ArrowRight size="20"/>
                    </Button>
                </div>
            </div>

            <div className="space-y-12">
                <h2 className="text-3xl font-bold text-center text-gray-100">
                    Proč bych měl/a používat Vyčetku?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {title: "Rychlé počítání", description: "Ušetřete čas díky automatickým výpočtům."},
                        {title: "Bez chyb", description: "Minimalizujte lidské chyby při počítání hotovosti."},
                        {title: "Snadné použití", description: "Intuitivní rozhraní pro snadnou obsluhu."},
                    ].map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-2">
                            <CheckCircle className="w-12 h-12 text-primary"/>
                            <h3 className="text-xl font-semibold text-gray-100">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}