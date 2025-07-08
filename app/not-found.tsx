"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function NotFound() {
    const { theme } = useTheme()
    const { locale } = useLanguage()
    const t = useTranslations(locale)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-8"
            >
                <div className="size-28 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground shadow-2xl">
                    <img
                        src={theme === "dark" ? "/icon-black-bg.png" : "/icon-white-bg.png"}
                        alt="Avatar"
                        className="size-28 rounded-full"
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
                    <h2 className="text-2xl font-semibold text-center mt-2">{t('notFoundTitle')}</h2>
                    <p className="text-muted-foreground text-center max-w-md">{t('notFoundDescription')}</p>
                </div>
                <Button asChild size="lg" className="mt-4">
                    <Link href="/">{t('notFoundBack')}</Link>
                </Button>
            </motion.div>
        </div>
    )
} 