"use client"

import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function TestI18nPage() {
    const { locale, mounted } = useLanguage()
    const t = useTranslations(locale)
    const { theme, setTheme } = useTheme()

    if (!mounted) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Тест интернационализации</h1>

                <div className="flex gap-4 mb-8">
                    <LanguageSwitcher />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="rounded-full"
                    >
                        {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                    </Button>
                </div>

                <div className="grid gap-6">
                    <div className="p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Текущий язык: {locale}</h2>
                        <p><strong>Заголовок:</strong> {t('heroTitle')}</p>
                        <p><strong>Подзаголовок:</strong> {t('heroSubtitle')}</p>
                        <p><strong>Кнопка:</strong> {t('getStarted')}</p>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Навигация</h2>
                        <div className="flex gap-4">
                            <span>{t('features')}</span>
                            <span>{t('reviews')}</span>
                            <span>{t('pricing')}</span>
                            <span>{t('faq')}</span>
                        </div>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Цены</h2>
                        <p><strong>Заголовок:</strong> {t('pricingTitle')}</p>
                        <p><strong>Месячно:</strong> {t('monthly')}</p>
                        <p><strong>Бесплатно:</strong> {t('free')}</p>
                        <p><strong>Pro:</strong> {t('pro')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 