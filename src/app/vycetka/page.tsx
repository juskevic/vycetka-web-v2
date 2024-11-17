"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import ValidatedInput from "@/components/ValidatedInput";
import { useSettings } from "../../../contexts/SettingsContext";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { RotateCcw } from 'lucide-react';

type Denomination = {
    value: number | string;
    count: number;
};

export default function BankNoteCalculator() {
    const { settings } = useSettings(); // Get settings from SettingsContext

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
        { value: "€", count: 0 },
    ];

    const [denominations, setDenominations] = useState<Denomination[]>(initialDenominations);
    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        const euroRate = parseFloat(settings.euroRate) || 1; // Use Euro rate from settings
        const euroValue = denominations.find((d) => d.value === "€")?.count || 0;
        const euroContribution = euroValue * euroRate;

        const newTotal = denominations.reduce((acc, curr) => {
            if (curr.value === "€") return acc; // Skip Euro here; it's added separately
            return acc + (typeof curr.value === "number" ? curr.value : 0) * curr.count;
        }, euroContribution); // Include the Euro contribution separately here

        setTotalSum(newTotal); // Total includes Euro contribution
    }, [denominations, settings]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" }).replace(",00", "");
    };

    const handleReset = () => {
        setDenominations(initialDenominations); // Reset denominations to initial state
    };

    const totalEuro = denominations.find((d) => d.value === "€")?.count || 0;

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
                        {denominations.map((denom, index) => (
                            <TableRow key={index}>
                                <TableCell className="whitespace-nowrap !text-center w-1/3">
                                    {denom.value === "€"
                                        ? `€ (${settings.euroRate} Kč)`
                                        : formatCurrency(typeof denom.value === "number" ? denom.value : 0)}
                                </TableCell>
                                <TableCell>
                                    <ValidatedInput
                                        value={denom.count}
                                        maxValue={settings.increaseLimitTo500 ? 500 : 99} // Adjust max value based on settings
                                        onChange={(newValue) => {
                                            const updatedDenominations = denominations.map((denom, i) =>
                                                i === index ? { ...denom, count: newValue } : denom
                                            );
                                            setDenominations(updatedDenominations);
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="w-1/3 !text-center">
                                    {formatCurrency(
                                        denom.value === "€"
                                            ? denom.count * parseFloat(settings.euroRate)
                                            : (typeof denom.value === "number" ? denom.value : 0) * denom.count
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-6 space-y-2 text-xl">
                    <div className="flex text-center justify-evenly">
                        <span className="font-semibold w-1/2">Celkově</span>
                        <span className="w-1/2">{formatCurrency(totalSum)}</span> {/* Includes Euro */}
                    </div>
                    <div className="flex text-center justify-evenly">
                        <span className="font-semibold w-1/2">Tržba</span>
                        <span className="w-1/2">
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
                                Vynulovat <RotateCcw />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Vynulování hodnot</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Opravdu chcete vynulovat zadané hodnoty?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-full">
                                    Ne
                                </AlertDialogCancel>
                                <AlertDialogAction className="rounded-full" onClick={handleReset}>
                                    Ano
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
}
