'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types
type Settings = {
    increaseLimitTo500: boolean;
    displayEuroSeparately: boolean;
    euroRate: string;
    initialDeposit: string;
    customDeposit: string;
};

type SettingsContextType = {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

// Create the context with a proper type
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Settings>({
        increaseLimitTo500: false,
        displayEuroSeparately: true,
        euroRate: "23",
        initialDeposit: "6000",
        customDeposit: "",
    });

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

// Custom hook to use the SettingsContext
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
