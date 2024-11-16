"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import ValidatedInput from "@/components/ValidatedInput";

type Denomination = {
    value: number | string;
    count: number;
}

export default function BankNoteCalculator() {

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
    ]

    const [denominations, setDenominations] = useState<Denomination[]>(initialDenominations)
    const [total, setTotal] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const [isSwitchOn, setIsSwitchOn] = useState(false)

    useEffect(() => {
        const newTotal = denominations.reduce((acc, curr) => {
            if (curr.value === "€") {
                return acc + curr.count * 23
            }
            return acc + (typeof curr.value === 'number' ? curr.value : 0) * curr.count
        }, 0)
        setTotal(newTotal)
        setRevenue(newTotal - 6000)
    }, [denominations])

    const formatCurrency = (value: number) => {
        return value.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" }).replace(',00', '')
    }

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
                                    {denom.value === "€" ? "€ (23 Kč)" : formatCurrency(typeof denom.value === 'number' ? denom.value : 0)}
                                </TableCell>
                                <TableCell>
                                    <ValidatedInput
                                        value={denom.count}
                                        maxValue={isSwitchOn ? 500 : 99}
                                        onChange={(newValue) => {
                                            const updatedDenominations = denominations.map((denom, i) =>
                                                i === index ? { ...denom, count: newValue } : denom
                                            );
                                            setDenominations(updatedDenominations);
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="w-1/3 !text-center">
                                    {formatCurrency(denom.value === "€" ? denom.count * 23 : (typeof denom.value === 'number' ? denom.value : 0) * denom.count)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-6 space-y-2 text-xl">
                    <div className="flex text-center justify-evenly">
                        <span className="font-semibold w-1/2">Celkově</span>
                        <span className="w-1/2">{formatCurrency(total)}</span>
                    </div>
                    <div className="flex text-center justify-evenly">
                        <span className="font-semibold w-1/2">Tržba</span>
                        <span className="w-1/2">{formatCurrency(revenue)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
