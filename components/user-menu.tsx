"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, LogOut, Info, FileText, Shield } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { removeToken } from "@/utils/auth"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"

export function UserMenu() {
    const router = useRouter()
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const { locale } = useLanguage()
    const t = useTranslations(locale)

    useEffect(() => {
        // Инициализация
        setUserEmail(localStorage.getItem('userEmail'))

        // Слушатель изменений в localStorage
        const handleStorageChange = () => {
            setUserEmail(localStorage.getItem('userEmail'))
        }

        window.addEventListener('storage', handleStorageChange)

        // Создаем кастомное событие для обновления при логине/логауте
        const handleCustomStorageChange = (e: Event) => {
            const customEvent = e as CustomEvent
            if (customEvent.detail?.key === 'userEmail') {
                setUserEmail(customEvent.detail?.value)
            }
        }

        window.addEventListener('customStorageChange', handleCustomStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('customStorageChange', handleCustomStorageChange)
        }
    }, [])

    const handleLogout = () => {
        removeToken()
        localStorage.removeItem('userEmail')
        // Вызываем кастомное событие
        window.dispatchEvent(new CustomEvent('customStorageChange', {
            detail: { key: 'userEmail', value: null }
        }))
        router.push('/auth')
    }

    if (!userEmail) {
        return (
            <Button
                onClick={() => router.push('/auth')}
                className="bg-gradient-to-r from-purple-600 to-purple-1200 hover:from-purple-600 hover:to-purple-700 text-white border-none"
            >
                {t('getStarted')}
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[150px] truncate">{userEmail}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push('/account')} className="text-purple-600">
                    <User className="mr-2 h-4 w-4" />
                    {t('myAccount')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/about')} className="text-purple-600">
                    <Info className="mr-2 h-4 w-4" />
                    {t('about')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/terms')} className="text-purple-600">
                    <FileText className="mr-2 h-4 w-4" />
                    {t('termsOfService')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/privacy')} className="text-purple-600">
                    <Shield className="mr-2 h-4 w-4" />
                    {t('privacyPolicy')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}