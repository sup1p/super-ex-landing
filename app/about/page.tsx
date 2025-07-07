"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mic, Globe, Shield, Zap, Users, TrendingUp, CheckCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"

export default function AboutPage() {
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
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-3xl"
                >
                    <section className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">{t('aboutTitle')}</h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-2">{t('aboutSubtitle')}</p>
                    </section>

                    <section className="mb-12">
                        <Card className="border-none shadow-none bg-gradient-to-br from-primary/10 to-muted/0">
                            <CardContent className="p-8 md:p-12 flex flex-col items-center">
                                <h2 className="text-2xl font-bold mb-2 text-center">{t('aboutMissionTitle')}</h2>
                                <p className="text-center text-muted-foreground text-lg">{t('aboutMissionText')}</p>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mb-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="flex flex-col items-center">
                                <Users className="size-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">15K+</span>
                                <span className="text-muted-foreground text-sm">{t('aboutStatsUsers')}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Mic className="size-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">120K+</span>
                                <span className="text-muted-foreground text-sm">{t('aboutStatsVoice')}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Zap className="size-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">80K+</span>
                                <span className="text-muted-foreground text-sm">{t('aboutStatsTasks')}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <CheckCircle className="size-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">99.98%</span>
                                <span className="text-muted-foreground text-sm">{t('aboutStatsUptime')}</span>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <Card className="border-none shadow-none bg-gradient-to-br from-secondary/10 to-muted/0">
                            <CardContent className="p-8 md:p-12">
                                <h2 className="text-2xl font-bold mb-2 text-center">{t('aboutStoryTitle')}</h2>
                                <p className="text-center text-muted-foreground text-lg mb-4" style={{ whiteSpace: 'pre-line' }}>{t('aboutStoryText')}</p>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-center">{t('aboutPrinciplesTitle')}</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="bg-gradient-to-br from-primary/5 to-muted/0 border-none">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <Mic className="size-7 text-primary mb-2" />
                                    <h3 className="font-semibold mb-1">{t('aboutPrinciple1Title')}</h3>
                                    <p className="text-center text-muted-foreground">{t('aboutPrinciple1Text')}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-primary/5 to-muted/0 border-none">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <Globe className="size-7 text-primary mb-2" />
                                    <h3 className="font-semibold mb-1">{t('aboutPrinciple2Title')}</h3>
                                    <p className="text-center text-muted-foreground">{t('aboutPrinciple2Text')}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-primary/5 to-muted/0 border-none">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <Shield className="size-7 text-primary mb-2" />
                                    <h3 className="font-semibold mb-1">{t('aboutPrinciple3Title')}</h3>
                                    <p className="text-center text-muted-foreground">{t('aboutPrinciple3Text')}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-primary/5 to-muted/0 border-none">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <TrendingUp className="size-7 text-primary mb-2" />
                                    <h3 className="font-semibold mb-1">{t('aboutPrinciple4Title')}</h3>
                                    <p className="text-center text-muted-foreground">{t('aboutPrinciple4Text')}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section className="mb-12 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4 text-center">{t('aboutCreatorTitle')}</h2>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex flex-col items-center">
                                <User className="size-16 text-primary mb-2" />
                                <span className="text-lg font-semibold">{t('aboutCreatorName')}</span>
                                <span className="text-muted-foreground text-sm">{t('aboutCreatorRole')}</span>
                            </div>
                            <div className="max-w-md text-center md:text-left text-muted-foreground">
                                <p>{t('aboutCreatorBio')}</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-center">{t('aboutContactTitle')}</h2>
                        <div className="flex flex-col items-center gap-2">
                            <span>{t('aboutContactGeneral')}</span>
                            <a href="mailto:support@yourmegan.me" className="text-primary underline text-lg font-medium">{t('aboutContactEmail')}</a>
                            <div className="flex gap-4 mt-4">
                                <a href="https://www.instagram.com/yourmegan_ai/" className="text-muted-foreground hover:text-primary transition-colors">{t('aboutContactInstagram')}</a>
                                <a href="https://www.linkedin.com/in/omar-sembek" className="text-muted-foreground hover:text-primary transition-colors">{t('aboutContactLinkedin')}</a>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </main>
        </div>
    )
} 