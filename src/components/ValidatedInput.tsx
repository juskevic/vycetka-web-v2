import React from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

interface ValidatedInputProps {
    value: number;
    maxValue: number;
    onChange: (newValue: number) => void;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({ value, maxValue, onChange }) => {
    const { toast } = useToast();

    const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Allow only numeric characters
        const isValidInput = /^[0-9]*$/.test(inputValue);

        if (!isValidInput) {
            // Show toast for invalid input
            toast({
                title: "Povoleny jsou pouze čísla!",
                description: "Zkontrolujte prosím svůj vstup.",
                variant: "destructive",
                action: <AlertCircle className="scale-110" />,
            });
            return;
        }

        if (inputValue === "") {
            onChange(0); // Reset value to 0 as a number
            return;
        }

        const numericValue = Number(inputValue);

        if (numericValue > maxValue) {
            // Show toast for exceeding max value
            toast({
                title: `Množství musí být nižší než ${maxValue}!`,
                description: "V nastavení můžete limit zvýšit na 500.",
                variant: "destructive",
                action: <AlertCircle className="scale-125" />,
            });
            onChange(maxValue); // Cap the value to max
        } else {
            onChange(numericValue); // Update with valid number value
        }
    };

    return (
        <Input
            type="text"
            value={value === 0 ? "" : value} // Show an empty string if the value is 0
            onChange={handleValidation}
            className="w-20 mx-auto !text-center text-base"
        />
    );
};

export default ValidatedInput;
