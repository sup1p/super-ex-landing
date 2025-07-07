"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, CheckCircle, AlertTriangle, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ForgotPasswordPage() {
    const { locale } = useLanguage();
    const t = useTranslations(locale);
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [cooldown, setCooldown] = useState(0)

    // Cooldown timer
    React.useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [cooldown])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setStatus("pending")
        setCooldown(60)
        try {
            const response = await fetch(`${API_URL}/user/pre-forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || t('forgotPasswordErrorDesc'))
            }
            setStatus("success")
            toast.success(t('forgotPasswordSentDesc'))
        } catch (err: any) {
            setStatus("error")
            setError(err.message)
            toast.error(err.message)
            setCooldown(0)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
            <header className="w-full border-b bg-background/95 backdrop-blur-sm">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/auth" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                        <ArrowLeft className="size-4" />
                        <span>{t('forgotPasswordBack')}</span>
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
                        <CardHeader>
                            <CardTitle>{t('forgotPasswordTitle')}</CardTitle>
                            <CardDescription>{t('forgotPasswordDesc')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {status === "success" ? (
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <CheckCircle className="size-12 text-green-500" />
                                    <CardTitle>{t('forgotPasswordSentTitle')}</CardTitle>
                                    <CardDescription>
                                        {t('forgotPasswordSentDesc')}
                                    </CardDescription>
                                    <Button onClick={() => router.push("/auth")}>{t('forgotPasswordSentButton')}</Button>
                                </div>
                            ) : status === "error" ? (
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <AlertTriangle className="size-12 text-red-500" />
                                    <CardTitle>{t('forgotPasswordErrorTitle')}</CardTitle>
                                    <CardDescription>{error || t('forgotPasswordErrorDesc')}</CardDescription>
                                    <Button onClick={() => setStatus("idle")}>{t('forgotPasswordErrorRetry')}</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <Mail className="size-12 text-primary" />
                                        <Input
                                            type="email"
                                            placeholder={t('forgotPasswordFormPlaceholder')}
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                    <Button type="submit" disabled={isLoading || cooldown > 0} className="w-full">
                                        {isLoading
                                            ? t('forgotPasswordFormSending')
                                            : cooldown > 0
                                                ? t('forgotPasswordFormResendWait').replace('{seconds}', cooldown.toString())
                                                : t('forgotPasswordFormButton')}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
} 