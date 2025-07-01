"use client"

import { useState, useEffect } from 'react'
import { Locale, defaultLocale } from '@/lib/i18n'

export function useLanguage() {
    const [locale, setLocale] = useState<Locale>(defaultLocale)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedLocale = localStorage.getItem('locale') as Locale
        if (savedLocale && ['en', 'ru'].includes(savedLocale)) {
            setLocale(savedLocale)
        }

        // Слушаем изменения localStorage (другие вкладки)
        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'locale') {
                const newLocale = e.newValue as Locale
                if (newLocale && ['en', 'ru'].includes(newLocale)) {
                    setLocale(newLocale)
                }
            }
        }
        window.addEventListener('storage', handleStorage)

        // Слушаем кастомное событие (внутри одной вкладки)
        const handleCustomLanguageChange = (e: Event) => {
            const customEvent = e as CustomEvent
            if (customEvent.detail?.locale && ['en', 'ru'].includes(customEvent.detail.locale)) {
                setLocale(customEvent.detail.locale)
            }
        }
        window.addEventListener('customLanguageChange', handleCustomLanguageChange)

        return () => {
            window.removeEventListener('storage', handleStorage)
            window.removeEventListener('customLanguageChange', handleCustomLanguageChange)
        }
    }, [])

    const changeLanguage = (newLocale: Locale) => {
        setLocale(newLocale)
        localStorage.setItem('locale', newLocale)
        // Обновляем lang атрибут в html
        if (typeof document !== 'undefined') {
            document.documentElement.lang = newLocale
        }
        // Диспатчим кастомное событие для синхронизации
        window.dispatchEvent(new CustomEvent('customLanguageChange', { detail: { locale: newLocale } }))
    }

    return {
        locale,
        changeLanguage,
        mounted
    }
} 