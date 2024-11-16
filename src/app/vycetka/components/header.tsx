'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import localFont from 'next/font/local'
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Menu} from "lucide-react";

const digitalCards = localFont({
    src: [
        {
            path: "../../../../public/fonts/DigitalCards-Demo.ttf",
            weight: "400",
        }
    ]
})

export default function VycetkaHeader() {

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
                              <Menu className="scale-150"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Výčetka (wv0.0.1)</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input id="username" value="@peduarte" className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}