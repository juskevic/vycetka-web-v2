import Link from 'next/link'
import {Button} from '@/components/ui/button'
import localFont from 'next/font/local'
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Info, Menu, Star} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useSettings} from "../../../../contexts/SettingsContext";



const digitalCards = localFont({
    src: [
        {
            path: "../../../../public/fonts/DigitalCards-Demo.ttf",
            weight: "400",
        }
    ]
})

export default function VycetkaHeader() {

    const { settings, setSettings } = useSettings();

    const handleSettingChange = (key: keyof typeof settings, value: string | boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <header className="fixed z-50 w-full bg-black">
            <div className="sticky z-50 flex flex-row justify-evenly p-3">
                <div className="flex flex-rowjustify-start">
                    <Link href="/" className={`${digitalCards.className} text-base md:text-lg font-bold my-auto`}>
                        Výčetka
                    </Link>
                </div>
                <div className="flex flex-row justify-end my-auto gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" color="primary" className="rounded-full">
                                <Menu className="scale-150" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-3/4 sm:max-w-md">
                            <SheetHeader>
                                <SheetTitle className="text-xl sm:text-2xl">Výčetka (wv0.0.1)</SheetTitle>
                                <SheetDescription className="text-sm sm:text-base">
                                    Změny se ukládají automaticky.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <Label htmlFor="increase-limit" className="text-sm sm:text-base">
                                        Rozšířit číselný limit na 500
                                    </Label>
                                    <Switch
                                        id="increase-limit"
                                        checked={settings.increaseLimitTo500}
                                        onCheckedChange={(checked) =>
                                            handleSettingChange("increaseLimitTo500", checked)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <Label htmlFor="display-euro" className="text-sm sm:text-base">
                                        Zobrazit zvlášť Euro v tržbě
                                    </Label>
                                    <Switch
                                        disabled
                                        id="display-euro"
                                        checked={settings.displayEuroSeparately}
                                        onCheckedChange={(checked) =>
                                            handleSettingChange("displayEuroSeparately", checked)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <Label htmlFor="euro-rate" className="text-sm sm:text-base">
                                        Kurz Euro k CZK
                                    </Label>
                                    <Select
                                        required
                                        value={settings.euroRate}
                                        onValueChange={(value) => handleSettingChange("euroRate", value)}
                                    >
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Vyberte kurz"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[20, 21, 22, 23, 24, 25, 26, 27].map((rate) => (
                                                <SelectItem key={rate} value={rate.toString()}>
                                                    {rate}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <Label htmlFor="initial-deposit" className="text-sm sm:text-base">
                                        Počáteční vklad
                                    </Label>
                                    <Select
                                        required
                                        value={settings.initialDeposit}
                                        onValueChange={(value) => handleSettingChange("initialDeposit", value)}
                                    >
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Vyberte částku"/>
                                        </SelectTrigger>
                                        <SelectContent defaultValue="4000">
                                            {[2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000].map((amount) => (
                                                <SelectItem key={amount} value={amount.toString()}>
                                                    {amount} {[4000, 6000, 8000].includes(amount) &&
                                                    <Star className="inline h-3 w-3 mb-1"/>}
                                                </SelectItem>
                                            ))}
                                            <SelectItem disabled value="custom">Vlastní (Nedostupné)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {settings.initialDeposit === "custom" && (
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <Label htmlFor="custom-deposit" className="text-sm sm:text-base">
                                            Vlastní částka
                                        </Label>
                                        <Input
                                            id="custom-deposit"
                                            type="number"
                                            className="w-full sm:w-[180px]"
                                            placeholder="Zadejte částku"
                                            value={settings.customDeposit}
                                            onChange={(e) => handleSettingChange('customDeposit', e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                            <Alert className="w-full border-orange-300 text-orange-300">
                                <Info className="!text-orange-300" size="20"/>
                                <AlertDescription>
                                    Některé funkce webové verze Výčetky jsou stále ve vývoji.
                                </AlertDescription>
                            </Alert>
                            <div className="mt-4 text-xs sm:text-sm text-muted-foreground">
                                Zajímá vás, jak Výčetka funguje? Podívejte se na <a href="#" className="underline">zdrojový
                                kód</a>.
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}