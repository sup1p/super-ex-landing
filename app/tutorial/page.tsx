"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X, ChevronDown, ChevronRight, Folder } from "lucide-react"
import { useTheme } from "next-themes"
import { UserMenu } from "@/components/user-menu"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations, TranslationKey } from "@/lib/i18n"

// Place gif1.gif, gif2.gif, ... in /public directory

const sidebarItems: { labelKey: TranslationKey; gif: string }[] = [
    { labelKey: "tutorialNotes", gif: "/megan1.mp4" },
    { labelKey: "tutorialChat", gif: "/megan2.mp4" },
    { labelKey: "tutorialVoice", gif: "/meganvoiceside.mp4" },
    { labelKey: "tutorialTranslate", gif: "/megan4.mp4" },
    { labelKey: "tutorialTools", gif: "/megan5.mp4" },
    { labelKey: "tutorialSettings", gif: "/megan67.mp4" },
]

const contextWindowItems: { labelKey: TranslationKey; gif: string }[] = [
    { labelKey: "tutorialChat", gif: "/megan8.mp4" },
    { labelKey: "tutorialMeganVoice", gif: "/meganvoicecontext.mp4" },
    { labelKey: "tutorialSave", gif: "/megan10.mp4" },
    { labelKey: "tutorialSummarize", gif: "/megan11.mp4" },
    { labelKey: "tutorialTranslate", gif: "/megan12.mp4" },
]

const folders: { key: string; labelKey: TranslationKey; items: { labelKey: TranslationKey; gif: string }[] }[] = [
    { key: "sidebar", labelKey: "tutorialSidebar", items: sidebarItems },
    { key: "context", labelKey: "tutorialContextWindow", items: contextWindowItems },
]

export default function TutorialPage() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const { locale } = useLanguage()
    const t = useTranslations(locale)

    // UI state
    const [openFolder, setOpenFolder] = useState<string | null>("sidebar")
    const [selected, setSelected] = useState<{ folder: string, idx: number }>({ folder: "sidebar", idx: 0 })

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    // Get current gif
    const currentFolder = folders.find(f => f.key === selected.folder)
    const currentItem = currentFolder?.items[selected.idx]

    return (
        <div className="flex min-h-[100dvh] flex-col">
            <header
                className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
            >
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                        {mounted && (
                            <Image
                                src="/icon2.png"
                                alt="Megan"
                                width={32}
                                height={32}
                                className="rounded-lg"
                                priority
                            />
                        )}
                        <span>Megan</span>
                    </Link>
                    <div className="hidden md:flex gap-4 items-center">
                        <LanguageSwitcher />
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <UserMenu />
                    </div>
                    <div className="flex items-center gap-4 md:hidden">
                        <LanguageSwitcher />
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center py-12 relative overflow-hidden">
                {/* Full-page background like in main page hero section */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent"></div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[1600px] relative"
                >
                    <div className="mx-auto bg-background/90 rounded-2xl shadow-2xl border border-border/40 flex flex-col items-center justify-center p-0" style={{ width: 1200, height: 600 }}>
                        <div className="flex w-full h-full">
                            {/* Left: folders and items */}
                            <div className="w-[340px] min-w-[300px] h-full border-r border-border/30 flex flex-col p-6 gap-2 bg-muted/40 rounded-l-2xl">
                                {folders.map(folder => (
                                    <div key={folder.key} className="mb-2">
                                        <button
                                            className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg font-semibold transition-colors ${openFolder === folder.key ? "bg-muted/80" : "hover:bg-muted/60"}`}
                                            onClick={() => setOpenFolder(openFolder === folder.key ? null : folder.key)}
                                        >
                                            <Folder className="size-5 text-primary" />
                                            <span>{t(folder.labelKey)}</span>
                                            {openFolder === folder.key ? <ChevronDown className="size-4 ml-auto" /> : <ChevronRight className="size-4 ml-auto" />}
                                        </button>
                                        {/* Items */}
                                        {openFolder === folder.key && (
                                            <div className="pl-8 pt-1 flex flex-col gap-1">
                                                {folder.items.map((item, idx) => (
                                                    <button
                                                        key={item.labelKey}
                                                        className={`text-left px-2 py-1 rounded-md transition-colors font-normal ${selected.folder === folder.key && selected.idx === idx ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted/60"}`}
                                                        onClick={() => setSelected({ folder: folder.key, idx })}
                                                    >
                                                        {t(item.labelKey)}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Right: gif preview */}
                            <div className="w-full flex flex-col items-center justify-center">
                                {currentItem && (
                                    <>
                                        <span className="mb-4 text-xl font-semibold text-muted-foreground">{t(currentItem.labelKey)}</span>
                                        <div
                                            className="rounded-2xl bg-background border border-border/30 flex items-center justify-center shadow-lg"
                                            style={{ width: 800, height: 500 }}
                                        >
                                            <video
                                                src={currentItem.gif}
                                                className="object-cover w-full h-full rounded-2xl"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
} 