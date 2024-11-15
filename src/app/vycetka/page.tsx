'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

const DENOMINATIONS: Array<number | '€'> = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1, '€'];
const EURO_RATE = 23;

type DenominationType = number | '€';
type ValueStateType = { [K in DenominationType]?: string };


export default function Home() {
    const initialStateValues: ValueStateType = {};

    DENOMINATIONS.forEach((denom) => {
        initialStateValues[denom] = '';
    });

    const [values, setValues] = useState(initialStateValues);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSnackbarVisible, setSnackbarVisible] = useState(false);

    const handleInputChange = (value: string, denom: DenominationType) => {
        const maxValue = 99;

        if (value === '' || /^\d+$/.test(value)) {
            const numValue = Number(value);

            if (numValue > maxValue) {
                setErrorMessage(`Množství musí být nižší než ${maxValue}!`);
                setSnackbarVisible(true);
                setTimeout(() => setSnackbarVisible(false), 3000);

                setValues((prev) => ({
                    ...prev,
                    [denom]: String(maxValue),
                }));
            } else {
                setErrorMessage('');
                setSnackbarVisible(false);

                setValues((prev) => ({
                    ...prev,
                    [denom]: value,
                }));
            }
        } else {
            setErrorMessage('Povoleny jsou pouze čísla!');
            setSnackbarVisible(true);
            setTimeout(() => setSnackbarVisible(false), 3000);
        }
    };

    const totalAmount = DENOMINATIONS.reduce((total, denom) => {
        const value = Number(values[denom]) || 0;
        return total + ((typeof denom === 'number' ? value * denom : value * EURO_RATE));
    }, 0);

    return (
        <div className="min-h-screen pt-14 sm:pt-0 p-4 md:p-8 lg:p-12 outline-2 outline-secondary outline rounded-md">
            <Table className="text-base md:text-lg lg:text-xl">
                <TableHeader>
                    <TableRow>
                        <TableCell className="font-bold !text-center">Bankovky</TableCell>
                        <TableCell className="font-bold !text-center">Množství</TableCell>
                        <TableCell className="font-bold !text-center">Částka</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {DENOMINATIONS.map((denom) => (
                        <TableRow key={denom} className="border-b">
                            <TableCell className="p-3 md:p-4 lg:p-5 !text-center">{denom}</TableCell>
                            <TableCell className="p-3 md:p-4 lg:p-5">
                                <Input
                                    value={values[denom] || ''}
                                    onChange={(e) => handleInputChange(e.target.value, denom)}
                                    type="number"
                                    className="text-center text-base md:text-lg lg:text-xl p-2 md:p-3 lg:p-4 w-1/2 mx-auto"
                                />
                            </TableCell>
                            <TableCell className="p-3 md:p-4 lg:p-5 !text-center">{denom !== '€' ? (Number(values[denom]) || 0) * denom : (Number(values[denom]) || 0) * EURO_RATE} Kč</TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="border-t-2">
                        <TableCell className="p-3 md:p-4 lg:p-5 font-bold !text-center" colSpan={2}>
                            Celkem
                        </TableCell>
                        <TableCell className="p-3 md:p-4 lg:p-5 font-bold !text-center">
                            {totalAmount} Kč
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-t">
                        <TableCell className="p-3 md:p-4 lg:p-5 font-bold !text-center" colSpan={2}>
                            Celkem - 6000
                        </TableCell>
                        <TableCell className="p-3 md:p-4 lg:p-5 font-bold !text-center">
                            {totalAmount - 6000} Kč
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {isSnackbarVisible && (
                <Alert variant="destructive" className="mt-4 text-base md:text-lg lg:text-xl">
                    {errorMessage}
                </Alert>
            )}
        </div>
    );
}
