import React from 'react'
import { CalendarIcon, Smartphone, Monitor } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ChangelogEntry = {
    version: string
    date: string
    changes: string[]
}

type ChangelogData = ChangelogEntry[]

type ChangelogSectionProps = {
    data: ChangelogData
}

const ChangelogSection: React.FC<ChangelogSectionProps> = ({ data }) => (
    <div className="space-y-8">
        {data.map((entry, index) => (
            <div key={index} className="border-b pb-6">
                <div className="flex items-center mb-4">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <h3 className="text-xl font-semibold">{entry.version} - {entry.date}</h3>
                </div>
                <ul className="list-disc list-inside space-y-2">
                    {entry.changes.map((change, changeIndex) => (
                        <li key={changeIndex}>
                            {change}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
)

export default function Component() {
    const mobileChangelogData: ChangelogData = [
        {
            version: "",
            date: "",
            changes: [
                "",
            ],
        },
    ]

    const webChangelogData: ChangelogData = [
        {
            version: "wv0.0.2",
            date: "21. 11. 2024",
            changes: [
                "Změna mobilního náhledového obrázku",
                "Přidáno tlačítko „Vánoční tématika“ (není funkční)",
                "Změna barvy pozadí hlavní stránky na černou",
            ],
        },
        {
            version: "wv0.0.1",
            date: "17. 11. 2024",
            changes: [
                "Přidány hlavní funkce a logika",
                "Přidána možnost obnovení hodnot",
                "Přidána možnost rozšířit početní limit na 500",
                "Přidána možnost změny kurzu eura",
                "Přidána možnost změnit počáteční vklad",
                "Přidána funkce pro kotvy (odkazy)",
                "Přidáno moderní uživatelské rozhraní využívající shadcn/ui",
                "Přidán responzivní design",
                "Přidány kontroly chyb při překročení limitu počtu a inkorektního vstupu",
            ],
        }
    ]

    return (
        <div className="h-screen container mx-auto px-4 py-8 pt-28 sm:pt-4">
            <Tabs defaultValue="mobile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 xl:w-1/2">
                    <TabsTrigger value="mobile" className="flex items-center justify-center">
                        <Smartphone className="w-5 h-5 mr-2" />
                        Android/iOS
                    </TabsTrigger>
                    <TabsTrigger value="web" className="flex items-center justify-center">
                        <Monitor className="w-5 h-5 mr-2" />
                        Web
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="mobile" className="mt-6">
                    <ChangelogSection data={mobileChangelogData} />
                </TabsContent>
                <TabsContent value="web" className="mt-6">
                    <ChangelogSection data={webChangelogData} />
                </TabsContent>
            </Tabs>
        </div>
    )
}