'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

const DENOMINATIONS: Array<number | '€'> = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1, '€'];
const EURO_RATE = 23;

type DenominationType = number | '€';
type ValueStateType = { [K in DenominationType]?: string };
type TotalStateType = { [K in DenominationType]?: number };

export default function Home() {
    const initialStateValues: ValueStateType = {};

    DENOMINATIONS.forEach((denom) => {
        initialStateValues[denom] = '';
    });

    const [values, setValues] = useState(initialStateValues);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSnackbarVisible, setSnackbarVisible] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleInputChange = (value: string, denom: DenominationType) => {
        const maxValue = isSwitchOn ? 500 : 99;

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

    return (
        <div className="min-h-screen p-4 outline-1 outline-secondary outline rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Bankovky</TableCell>
                        <TableCell>Množství</TableCell>
                        <TableCell>Částka</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {DENOMINATIONS.map((denom) => (
                        <TableRow key={denom}>
                            <TableCell>{denom}</TableCell>
                            <TableCell>
                                <Input
                                    value={values[denom] || ''}
                                    onChange={(e) => handleInputChange(e.target.value, denom)}
                                    type="number"
                                    className="text-center"
                                />
                            </TableCell>
                            <TableCell>{denom !== '€' ? Number(values[denom] || 0) * denom : Number(values[denom] || 0) * EURO_RATE} Kč</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {isSnackbarVisible && (
                <Alert variant="destructive" className="mt-4">
                    {errorMessage}
                </Alert>
            )}
        </div>
    );
}
