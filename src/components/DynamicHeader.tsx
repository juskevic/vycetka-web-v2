"use client";

import React from "react";
import { usePathname } from "next/navigation";
import VycetkaHeader from "@/app/vycetka/components/header";
import Header from "@/components/header";


export default function DynamicHeader() {
    const pathname = usePathname();

    return pathname === "/vycetka" ? <VycetkaHeader /> : <Header />;
}
