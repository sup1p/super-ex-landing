"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"

export default function TermsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const { locale, mounted: languageMounted } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const t = useTranslations(locale);
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
                            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('termsTitle')}</h1>
                            <p className="mb-4 text-muted-foreground text-sm text-center">{t('termsLastUpdated')}</p>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection1Title')}</h2>
                                <p>{t('termsSection1Text1')}</p>
                                <p className="mt-2">{t('termsSection1Text2')}</p>
                                <p className="mt-2">{t('termsSection1Text3')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection2Title')}</h2>
                                <p>{t('termsSection2Text1')}</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>{t('termsSection2List1')}</li>
                                    <li>{t('termsSection2List2')}</li>
                                    <li>{t('termsSection2List3')}</li>
                                    <li>{t('termsSection2List4')}</li>
                                    <li>{t('termsSection2List5')}</li>
                                </ul>
                                <p className="mt-2">{t('termsSection2Text2')}</p>
                                <p className="mt-2">{t('termsSection2Text3')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection3Title')}</h2>
                                <p>{t('termsSection3Text1')}</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>{t('termsSection3List1')}</li>
                                    <li>{t('termsSection3List2')}</li>
                                    <li>{t('termsSection3List3')}</li>
                                </ul>
                                <p className="mt-2">{t('termsSection3Text2')}</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>{t('termsSection3List4')}</li>
                                    <li>{t('termsSection3List5')}</li>
                                    <li>{t('termsSection3List6')}</li>
                                    <li>{t('termsSection3List7')}</li>
                                </ul>
                                <p className="mt-2">{t('termsSection3Text3')} <a href="mailto:support@yourmegan.me" className="text-primary underline">support@yourmegan.me</a>.</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection4Title')}</h2>
                                <p>{t('termsSection4Text1')} <Link href="/privacy" className="text-primary underline">{t('privacyPolicy')}</Link>, {t('termsSection4Text2')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection5Title')}</h2>
                                <p>{t('termsSection5Text1')}</p>
                                <p className="mt-2">{t('termsSection5Text2')}</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>{t('termsSection5List1')}</li>
                                    <li>{t('termsSection5List2')}</li>
                                    <li>{t('termsSection5List3')}</li>
                                </ul>
                                <p className="mt-2">{t('termsSection5Text3')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection6Title')}</h2>
                                <p>{t('termsSection6Text1')}</p>
                                <p className="mt-2">{t('termsSection6Text2')}</p>
                                <p className="mt-2">{t('termsSection6Text3')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection7Title')}</h2>
                                <p>{t('termsSection7Text1')}</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>{t('termsSection7List1')}</li>
                                    <li>{t('termsSection7List2')}</li>
                                    <li>{t('termsSection7List3')}</li>
                                    <li>{t('termsSection7List4')}</li>
                                    <li>{t('termsSection7List5')}</li>
                                </ul>
                                <p className="mt-2">{t('termsSection7Text2')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection8Title')}</h2>
                                <p>{t('termsSection8Text1')}</p>
                                <p className="mt-2">{t('termsSection8Text2')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection9Title')}</h2>
                                <p>{t('termsSection9Text1')}</p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection10Title')}</h2>
                                <p>{t('termsSection10Text1')}<br /><a href="mailto:support@yourmegan.me" className="text-primary underline">support@yourmegan.me</a></p>
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">{t('termsSection11Title')}</h2>
                                <p>{t('termsSection11Text1')}</p>
                            </section>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
} 