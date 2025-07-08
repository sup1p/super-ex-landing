"use client"

import type React from "react"
import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Mail, AlertTriangle, Clock, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"
import { useTheme } from "next-themes"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ConfirmPasswordPage() {
    const { locale } = useLanguage();
    const t = useTranslations(locale);
    const { theme, setTheme } = useTheme()

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
            <header className="w-full border-b bg-background/95 backdrop-blur-sm">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                        <ArrowLeft className="size-4" />
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                                <img src={theme === "dark" ? "/icon-black-bg.png" : "/icon-white-bg.png"} alt="Megan" className="size-8" />
                            </div>
                            <span>Megan</span>
                        </div>
                    </Link>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Card className="border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur shadow-xl">
                        <CardHeader />
                        <CardContent>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ConfirmPasswordContent t={t} />
                            </Suspense>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
}

function ConfirmPasswordContent({ t }: { t: ReturnType<typeof useTranslations> }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const email = searchParams.get("email")
    const [status, setStatus] = useState<"success" | "error" | "idle">("idle")
    const [error, setError] = useState<string | null>(null)
    const [resendCooldown, setResendCooldown] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // 2. Handle resend cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCooldown])

    // 3. Handle resend email action
    const handleResend = async () => {
        if (!email) {
            toast.error(t('passwordChangeEmailNotFound'))
            return
        }
        setIsLoading(true)
        setError(null)
        setResendCooldown(60)
        try {
            const response = await fetch(`${API_URL}/user/change-password/resend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || t('passwordChangeResendError'))
            }
            toast.success(t('passwordChangeResendSuccess'))
        } catch (err: any) {
            setError(err.message)
            toast.error(err.message)
            setResendCooldown(0)
        } finally {
            setIsLoading(false)
        }
    }

    // 4. Handle password change submit
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!token) return
        if (newPassword !== confirmPassword) {
            toast.error(t('passwordChangeMismatch'))
            return
        }
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`${API_URL}/user/change-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ new_password: newPassword, token }),
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || t('passwordChangeFailed'))
            }
            setStatus("success")
            toast.success(t('passwordChangeSuccessDesc'))
            setTimeout(() => router.push("/auth"), 3000)
        } catch (err: any) {
            setError(err.message)
            setStatus("error")
            toast.error(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const renderContent = () => {
        if (token) {
            switch (status) {
                case "idle":
                    return (
                        <form onSubmit={handleChangePassword} className="flex flex-col items-center gap-4 text-center">
                            <Lock className="size-12 text-primary" />
                            <CardTitle>{t('passwordChangeTitle')}</CardTitle>
                            <CardDescription>{t('passwordChangeDesc')}</CardDescription>
                            <Input
                                type="password"
                                placeholder={t('passwordNewPlaceholder')}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="w-full"
                                required
                            />
                            <Input
                                type="password"
                                placeholder={t('passwordRepeatPlaceholder')}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full"
                                required
                            />
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? t('passwordChangeSaving') : t('passwordChangeButton')}
                            </Button>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </form>
                    )
                case "success":
                    return (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <CheckCircle className="size-12 text-green-500" />
                            <CardTitle>{t('passwordChangeSuccessTitle')}</CardTitle>
                            <CardDescription>
                                {t('passwordChangeSuccessDesc')}
                            </CardDescription>
                            <Button onClick={() => router.push("/auth")}>{t('passwordChangeSuccessButton')}</Button>
                        </div>
                    )
                case "error":
                    return (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <AlertTriangle className="size-12 text-red-500" />
                            <CardTitle>{t('passwordChangeErrorTitle')}</CardTitle>
                            <CardDescription>
                                {error || t('passwordChangeErrorDesc')}
                            </CardDescription>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => router.push("/auth")}>{t('passwordChangeErrorBack')}</Button>
                                {email && (
                                    <Button onClick={() => setStatus("idle")}>{t('passwordChangeErrorRequest')}</Button>
                                )}
                            </div>
                        </div>
                    )
                default:
                    return null
            }
        } else {
            return (
                <div className="flex flex-col items-center gap-4 text-center">
                    <Mail className="size-12 text-primary" />
                    <CardTitle>{t('passwordChangeSentTitle')}</CardTitle>
                    <CardDescription>
                        {t('passwordChangeSentDesc').replace('{email}', email || t('email'))}
                    </CardDescription>
                    <Button onClick={handleResend} disabled={resendCooldown > 0 || isLoading} className="w-full">
                        {isLoading
                            ? t('passwordChangeSentSending')
                            : resendCooldown > 0
                                ? t('passwordChangeSentResendWait').replace('{seconds}', resendCooldown.toString())
                                : t('passwordChangeSentResend')}
                    </Button>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
            )
        }
    }

    return renderContent()
} 