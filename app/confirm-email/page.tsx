"use client"

import type React from "react"
import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Mail, AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ConfirmEmailPage() {
    const { locale } = useLanguage();
    const t = useTranslations(locale);
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
            <header className="w-full border-b bg-background/95 backdrop-blur-sm">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                        <ArrowLeft className="size-4" />
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                                <img src="/icon.png" alt="Megan" className="size-8" />
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
                                <ConfirmEmailContent t={t} />
                            </Suspense>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
}

function ConfirmEmailContent({ t }: { t: ReturnType<typeof useTranslations> }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const email = searchParams.get("email")
    const [status, setStatus] = useState<"pending" | "success" | "error" | "idle">("idle")
    const [error, setError] = useState<string | null>(null)
    const [resendCooldown, setResendCooldown] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    // 1. Handle token confirmation
    useEffect(() => {
        if (token) {
            setStatus("pending")
            fetch(`${API_URL}/auth/confirm?token=${encodeURIComponent(token)}`)
                .then(async res => {
                    const data = await res.json()

                    if (!res.ok) {
                        if (data.detail?.includes("already exists") ||
                            data.detail?.includes("already confirmed") ||
                            data.detail?.includes("уже существует") ||
                            data.detail?.includes("уже подтвержден") ||
                            res.status === 400) {
                            setStatus("success")
                            toast.success(t('confirmEmailSuccessDesc'))
                            setTimeout(() => router.push("/auth"), 3000)
                            return
                        }
                        throw new Error(data.detail || t('confirmEmailErrorDesc'))
                    }
                    setStatus("success")
                    toast.success(t('confirmEmailSuccessDesc'))
                    setTimeout(() => router.push("/auth"), 3000)
                })
                .catch(err => {
                    setError(err.message)
                    setStatus("error")
                    toast.error(err.message)
                })
        }
    }, [token, router, t])

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
            toast.error(t('confirmEmailEmailNotFound'))
            return
        }
        setIsLoading(true)
        setError(null)
        setResendCooldown(90)
        try {
            const response = await fetch(`${API_URL}/auth/resend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || t('confirmEmailResendError'))
            }
            toast.success(t('confirmEmailResendSuccess'))
        } catch (err: any) {
            setError(err.message)
            toast.error(err.message)
            setResendCooldown(0)
        } finally {
            setIsLoading(false)
        }
    }

    const renderContent = () => {
        if (token) {
            switch (status) {
                case "pending":
                    return (
                        <div className="flex flex-col items-center gap-4">
                            <Clock className="size-12 text-primary animate-spin" />
                            <CardTitle>{t('confirmEmailPendingTitle')}</CardTitle>
                            <CardDescription>{t('confirmEmailPendingDesc')}</CardDescription>
                        </div>
                    )
                case "success":
                    return (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <CheckCircle className="size-12 text-green-500" />
                            <CardTitle>{t('confirmEmailSuccessTitle')}</CardTitle>
                            <CardDescription>
                                {t('confirmEmailSuccessDesc')}
                            </CardDescription>
                            <Button onClick={() => router.push("/auth")}>{t('confirmEmailSuccessButton')}</Button>
                        </div>
                    )
                case "error":
                    return (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <AlertTriangle className="size-12 text-red-500" />
                            <CardTitle>{t('confirmEmailErrorTitle')}</CardTitle>
                            <CardDescription>
                                {error || t('confirmEmailErrorDesc')}
                            </CardDescription>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => router.push("/auth")}>{t('confirmEmailErrorBack')}</Button>
                                {email && (
                                    <Button onClick={() => setStatus("idle")}>{t('confirmEmailErrorRequest')}</Button>
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
                    <CardTitle>{t('confirmEmailSentTitle')}</CardTitle>
                    <CardDescription>
                        {t('confirmEmailSentDesc').replace('{email}', email || t('email'))}
                    </CardDescription>
                    <Button onClick={handleResend} disabled={resendCooldown > 0 || isLoading} className="w-full">
                        {isLoading
                            ? t('confirmEmailSentSending')
                            : resendCooldown > 0
                                ? t('confirmEmailSentResendWait').replace('{seconds}', resendCooldown.toString())
                                : t('confirmEmailSentButton')}
                    </Button>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
            )
        }
    }

    return renderContent()
}