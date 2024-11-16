"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

type Denomination = {
    value: number | string
    count: number
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
    const [warning, setWarning] = useState("")
    const [isSwitchOn, setIsSwitchOn] = useState(false) // Example switch state for max value condition

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

    const handleInputChange = (index: number, value: string) => {
        const maxValue = isSwitchOn ? 500 : 99;
        if (value === '') {
            const newDenominations = denominations.map((denom, i) =>
                i === index ? { ...denom, count: 0 } : denom
            )
            setDenominations(newDenominations)
            return;
        }
        const numValue = Number(value);
        const isNumeric = /^\d+$/.test(value);

        if (isNumeric) {
            if (numValue > maxValue) {
                setWarning(`Množství musí být nižší než ${maxValue}!`);
                const newDenominations = denominations.map((denom, i) =>
                    i === index ? { ...denom, count: maxValue } : denom
                )
                setDenominations(newDenominations);
                return;
            } else {
                setWarning('');
                const newDenominations = denominations.map((denom, i) =>
                    i === index ? { ...denom, count: numValue } : denom
                )
                setDenominations(newDenominations);
            }
        } else {
            setWarning('Povoleny jsou pouze čísla!');
        }
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString("cs-CZ", { style: "currency", currency: "CZK" }).replace(',00', '')
    }

    return (
        <Card className="w-full max-w-4xl mx-auto pt-16">
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
                                    {denom.value === "€" ? "€ (23 CZK)" : formatCurrency(typeof denom.value === 'number' ? denom.value : 0)}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        min="0"
                                        max={isSwitchOn ? "500" : "99"}
                                        value={denom.count === 0 ? '' : denom.count}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        className="w-20 mx-auto !text-center text-base"
                                    />
                                </TableCell>
                                <TableCell className="w-1/3 !text-center">
                                    {formatCurrency(denom.value === "€" ? denom.count * 23 : (typeof denom.value === 'number' ? denom.value : 0) * denom.count)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {warning && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>{warning}</AlertDescription>
                    </Alert>
                )}

                <div className="mt-6 space-y-2">
                    <div className="flex justify-evenly">
                        <span className="font-semibold">Total:</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-evenly">
                        <span className="font-semibold">Revenue:</span>
                        <span>{formatCurrency(revenue)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
