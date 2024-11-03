import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/header";

export const metadata: Metadata = {
    title: "Výčetka by Max Juškevič",
    description: "Generated by create next app",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`dark`}>
        <Header/>
        <div className="xl:p-40">
            {children}
        </div>
        </body>
        </html>
    );
}
