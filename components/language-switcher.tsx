"use client"

import { useState } from "react"
import { ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n"

export function LanguageSwitcher() {
    const { locale, changeLanguage, mounted } = useLanguage()
    const [open, setOpen] = useState(false)

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="size-[18px]" />
                <span className="sr-only">Language</span>
            </Button>
        )
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Globe className="size-[18px]" />
                    <span className="sr-only">Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {locales.map((lang) => (
                    <DropdownMenuItem
                        key={lang}
                        onClick={() => {
                            changeLanguage(lang)
                            setOpen(false)
                        }}
                        className={`flex items-center gap-2 ${locale === lang ? "bg-accent" : ""
                            }`}
                    >
                        <span className="text-lg">{localeFlags[lang]}</span>
                        <span>{localeNames[lang]}</span>
                        {locale === lang && (
                            <span className="ml-auto text-xs text-muted-foreground">✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 