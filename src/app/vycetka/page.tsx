// This component allows users to calculate the total value of various banknotes and coins, including Euros.
// It provides an interactive table where users can input the count of each denomination, reset values, and view total earnings.
// The component also supports settings from a global context that affect the calculations.

// Tato komponenta umožňuje uživatelům vypočítat celkovou hodnotu různých bankovek a mincí, včetně eura.
// Poskytuje interaktivní tabulku, do které mohou uživatelé zadávat počet jednotlivých nominálních hodnot, resetovat hodnoty a zobrazit celkový výdělek.
// Komponenta také podporuje nastavení z globálního kontextu, které ovlivňuje výpočty.

"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import ValidatedInput from "@/components/ValidatedInput";
import { useSettings } from "../../../contexts/SettingsContext";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { RotateCcw } from 'lucide-react';

// Type definition for denomination values
// Denomination can be either a numeric value or a string (e.g., "€")
// Definice typu pro hodnoty nominálů
// Nominál může být buď číselná hodnota nebo řetězec (např. "€")
type Denomination = {
    value: number | string;
    count: number;
};

export default function BankNoteCalculator() {
    const { settings } = useSettings(); // Get settings from SettingsContext
    // Získání nastavení z SettingsContext

    // Initial denominations, including different banknote values and Euro
    // Počáteční nominály, včetně různých hodnot bankovek a eura
    const initialDenominations: Denomination[] = [
        { value: 2000, count: 0 },
        { value: 1000, count: 0 },
        { value: 500, count: 0 },
        { value: 200, count: 0 },
        { value: 100, count: 0 },
        { value: 50, count: 0 },
        { value: 20, count: 0 },
        { value: 10, count: 0 },
        { value: 5, count: 0 },
        { value: 2, count: 0 },
        { value: 1, count: 0 },
        { value: "€", count: 0 }, // Represents Euro denomination
        // Představuje nominál v eurech
    ];

    const [denominations, setDenominations] = useState<Denomination[]>(initialDenominations);
    const [totalSum, setTotalSum] = useState(0); // State to keep track of the total sum
    // Stav pro sledování celkové částky

    // useEffect to calculate total sum when denominations or settings change
    // useEffect pro výpočet celkové částky při změně nominálů nebo nastavení
    useEffect(() => {
        const euroRate = parseFloat(settings.euroRate) || 1; // Use Euro rate from settings, default to 1 if not set
        // Použijte směnný kurz eura z nastavení, výchozí hodnota je 1, pokud není nastaveno
        const euroValue = denominations.find((d) => d.value === "€")?.count || 0; // Get the Euro count
        // Získání počtu eur
        const euroContribution = euroValue * euroRate; // Calculate Euro contribution in CZK
        // Výpočet příspěvku v eurech v CZK

        // Calculate the new total sum based on all denominations
        // Výpočet nové celkové částky na základě všech nominálů
        const newTotal = denominations.reduce((acc, curr) => {
            if (curr.value === "€") return acc; // Skip Euro calculation here, already added separately
            // Přeskočte výpočet eura zde, již přidáno zvlášť
            return acc + (typeof curr.value === "number" ? curr.value : 0) * curr.count; // Multiply value by count
            // Vynásobte hodnotu množstvím
        }, euroContribution); // Start with Euro contribution
        // Začněte s příspěvkem v eurech

        setTotalSum(newTotal); // Update total sum state
        // Aktualizace stavu celkové částky
    }, [denominations, settings]);

    // Function to format a number as currency in CZK
    // Funkce pro formátování čísla jako měny v CZK
    const formatCurrency = (value: number) => {
        return value.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" }).replace(",00", "");
    };

    // Function to reset denominations to their initial state
    // Funkce pro resetování nominálů do jejich počátečního stavu
    const handleReset = () => {
        setDenominations(initialDenominations);
    };

    const totalEuro = denominations.find((d) => d.value === "€")?.count || 0; // Get total Euro count
    // Získání celkového počtu eur

    return (
        <Card className="w-full max-w-4xl mx-auto pt-16 md:pt-0">
            <CardContent>
                <Table className="text-base">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="!text-center">Bankovky</TableHead>
                            <TableHead className="!text-center">Množství</TableHead>
                            <TableHead className="!text-center">Celkově</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Iterate over each denomination to display in the table */}
                        {/* Iterace přes každý nominál k zobrazení v tabulce */}
                        {denominations.map((denom, index) => (
                            <TableRow key={index}>
                                <TableCell className="whitespace-nowrap !text-center w-1/3">
                                    {/* Display the denomination value, formatted appropriately */}
                                    {/* Zobrazte hodnotu nominálu, správně naformátovanou */}
                                    {denom.value === "€"
                                        ? `€ (${settings.euroRate} Kč)` // Show Euro value with exchange rate
                                        // Zobrazte hodnotu eura se směnným kurzem
                                        : formatCurrency(typeof denom.value === "number" ? denom.value : 0)}
                                </TableCell>
                                <TableCell>
                                    {/* Input for entering the count of each denomination */}
                                    {/* Vstup pro zadání počtu jednotlivých nominálů */}
                                    <ValidatedInput
                                        value={denom.count}
                                        maxValue={settings.increaseLimitTo500 ? 500 : 99} // Set max value based on settings
                                        // Nastavte maximální hodnotu na základě nastavení
                                        onChange={(newValue) => {
                                            // Update the specific denomination count
                                            // Aktualizujte konkrétní počet nominálů
                                            const updatedDenominations = denominations.map((denom, i) =>
                                                i === index ? { ...denom, count: newValue } : denom
                                            );
                                            setDenominations(updatedDenominations);
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="w-1/3 !text-center">
                                    {/* Display the total value for the given denomination */}
                                    {/* Zobrazte celkovou hodnotu pro daný nominál */}
                                    {formatCurrency(
                                        denom.value === "€"
                                            ? denom.count * parseFloat(settings.euroRate) // Calculate total for Euro
                                            // Vypočítejte celkovou hodnotu pro euro
                                            : (typeof denom.value === "number" ? denom.value : 0) * denom.count // Calculate total for CZK denominations
                                        // Vypočítejte celkovou hodnotu pro nominály v CZK
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-6 space-y-2 text-xl">
                    <div className="flex text-center justify-evenly">
                        <span className="font-semibold w-1/2">Celkově</span>
                        <span className="w-1/2">{formatCurrency(totalSum)}</span> {/* Display total sum */}
                        {/* Zobrazte celkovou částku */}
                    </div>
                    <div className="flex text-center justify-evenly">
                        <span className="font-semibold w-1/2">Tržba</span>
                        <span className="w-1/2">
                            {/* Display total earnings after subtracting initial deposit and Euro contribution */}
                            {/* Zobrazte celkové výdělky po odečtení počátečního vkladu a příspěvku v eurech */}
                            {totalSum <= parseInt(settings.initialDeposit)
                                ? "0"
                                : totalEuro > 0
                                    ? `${formatCurrency(totalSum - parseInt(settings.initialDeposit) - totalEuro * parseFloat(settings.euroRate))} + ${totalEuro} €`
                                    : `${formatCurrency(totalSum - parseInt(settings.initialDeposit))}`}
                        </span>
                    </div>
                </div>
                <div className="mt-4 mr-4 flex justify-end">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="rounded-full">
                                Vynulovat <RotateCcw /> {/* Reset button with icon */}
                                {/* Tlačítko pro reset s ikonou */}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Vynulování hodnot</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Opravdu chcete vynulovat zadané hodnoty? {/* Confirmation prompt for reset */}
                                    {/* Potvrzovací výzva pro reset */}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-full">
                                    Ne {/* Cancel button */}
                                    {/* Tlačítko pro zrušení */}
                                </AlertDialogCancel>
                                <AlertDialogAction className="rounded-full" onClick={handleReset}>
                                    Ano {/* Confirm button to reset values */}
                                    {/* Potvrzovací tlačítko pro reset hodnot */}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
}
