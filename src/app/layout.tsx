import type {Metadata, Viewport} from "next";
import "./globals.css";
import React from "react";
import Footer from "@/components/footer";
import DynamicHeader from "@/components/DynamicHeader";
import {Toaster} from "@/components/ui/toaster";
import {SettingsProvider} from "../../contexts/SettingsContext";

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    title: "Výčetka | Max Juškevič",
    description: "Výčetka je moderní a snadno použitelná online kalkulačka bankovek. Ideální pro správu hotovosti, výpočty celkových částek a zajištění přesnosti. Navrhl Max Juškevič.",
    icons: {
        icon: '/favicon.ico',
    },
    creator: "Max Juškevič",
    publisher: "Max Juškevič",
    category: 'technology',
    keywords: [
        "Výčetka",
        "kalkulačka bankovek",
        "správa hotovosti",
        "kalkulace peněz",
        "kalkulačka měny",
        "nástroj pro správu hotovosti",
        "online kalkulačka",
        "Max Juškevič",
    ],
    robots: "index, follow",
    openGraph: {
        title: "Výčetka | Max Juškevič",
        description: "Spravujte svou hotovost a počítejte celkové částky snadno pomocí Výčetky, moderní kalkulačky bankovek navržené pro přesnost a jednoduchost.",
        url: "https://vycetka.juskevic.com",
        type: "website",
        locale: "cs_CZ",
        images: [
            {
                url: "https://vycetka.juskevic.com/public/GraphicFeature.webp",
                width: 1200,
                alt: "Výčetka - Online kalkulačka bankovek",
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Výčetka | Max Juškevič",
        description: "Počítejte své celkové částky snadno pomocí Výčetky, moderní a uživatelsky přívětivé online kalkulačky bankovek.",
        images: ["https://vycetka.juskevic.com/public/GraphicFeature.webp"]
    },
};


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="cs">
        <SettingsProvider>
            <body className="dark">
            <DynamicHeader/>
            <div className="xl:p-20">
                {children}
            </div>
            <Footer/>
            <Toaster/>
            </body>
        </SettingsProvider>
        </html>
    );
}
