"use client"
import React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { useTranslations } from "@/lib/i18n"
import { useLanguage } from "@/hooks/use-language"





export default function PrivacyPage() {
    const [mounted, setMounted] = React.useState(false);
    const { theme, setTheme } = useTheme()
    const { locale, mounted: languageMounted } = useLanguage()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const t = useTranslations(locale)
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    React.useEffect(() => { setMounted(true); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
            <header className="w-full border-b bg-background/95 backdrop-blur-sm">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                            {mounted && (
                                <img src={theme === "dark" ? "/icon-black-bg.png" : "/icon-white-bg.png"} alt="Megan" className="size-8" />
                            )}
                        </div>
                        <span>Megan</span>
                    </Link>
                    <div className="hidden md:flex gap-4 items-center">
                        <LanguageSwitcher />
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                            <span className="sr-only">{t('toggleTheme')}</span>
                        </Button>
                        <UserMenu />
                    </div>
                    <div className="flex items-center gap-4 md:hidden">
                        <LanguageSwitcher />
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                        </Button>
                    </div>
                </div>


            </header>
            <main className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-3xl"
                >
                    <Card className="border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur shadow-xl">
                        <CardContent className="p-8">
                            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('privacyTitle')}</h1>
                            <p className="mb-4 text-muted-foreground text-sm text-center">{t('privacyEffectiveDate')}</p>
                            <p className="mb-8 text-center text-muted-foreground text-sm">{t('privacyContact')}: <a href="mailto:support@yourmegan.me" className="text-primary underline">support@yourmegan.me</a></p>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyIntroTitle')}</h2>
                                <p>{t('privacyIntroText')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyDataCollectionTitle')}</h2>
                                <p>{t('privacyDataCollectionText1')}</p>
                                <p className="mt-2">{t('privacyDataCollectionText2')}</p>
                                <p className="mt-2">{t('privacyDataCollectionText3')}</p>
                                <p className="mt-2">{t('privacyDataCollectionText4')}</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>{t('privacyDataCollectionList1')}</li>
                                    <li>{t('privacyDataCollectionList2')}</li>
                                    <li>{t('privacyDataCollectionList3')}</li>
                                </ul>
                                <p className="mt-2">{t('privacyDataCollectionText5')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyAnalyticsTitle')}</h2>
                                <p>{t('privacyAnalyticsText1')}</p>
                                <p className="mt-2">{t('privacyAnalyticsText2')} <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Partner Sites Policy</a></p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyApiTitle')}</h2>
                                <p>{t('privacyApiText')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyPermissionsTitle')}</h2>
                                <p>{t('privacyPermissionsText')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyAdsTitle')}</h2>
                                <p>{t('privacyAdsText')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacySecurityTitle')}</h2>
                                <p>{t('privacySecurityText')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyChangesTitle')}</h2>
                                <p>{t('privacyChangesText')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyContactTitle')}</h2>
                                <p>{t('privacyContactText')} <a href="mailto:support@yourmegan.me" className="text-primary underline">support@yourmegan.me</a></p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('privacyDeletionTitle')}</h2>
                                <p>{t('privacyDeletionText')}</p>
                            </section>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
} 