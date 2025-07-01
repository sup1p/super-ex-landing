"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Mail, AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

const API_URL = "http://localhost:8000"

export default function ConfirmEmailPage() {
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
                        // Проверяем, если пользователь уже существует или аккаунт уже подтвержден
                        if (data.detail?.includes("already exists") ||
                            data.detail?.includes("already confirmed") ||
                            data.detail?.includes("уже существует") ||
                            data.detail?.includes("уже подтвержден") ||
                            res.status === 400) {
                            // Считаем это успехом, так как цель достигнута
                            setStatus("success")
                            toast.success("Ваш аккаунт уже подтвержден! Вы можете войти в систему.")
                            setTimeout(() => router.push("/auth"), 3000)
                            return
                        }

                        throw new Error(data.detail || "Подтверждение не удалось")
                    }

                    // Успешное подтверждение
                    setStatus("success")
                    toast.success("Email успешно подтвержден! Теперь вы можете войти в систему.")
                    setTimeout(() => router.push("/auth"), 3000)
                })
                .catch(err => {
                    // Только для реальных ошибок
                    setError(err.message)
                    setStatus("error")
                    toast.error(err.message)
                })
        }
    }, [token, router])

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
            toast.error("Адрес электронной почты не найден.")
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
                throw new Error(data.detail || "Не удалось отправить письмо повторно")
            }
            toast.success("Письмо с подтверждением отправлено повторно.")
        } catch (err: any) {
            setError(err.message)
            toast.error(err.message)
            setResendCooldown(0) // Reset cooldown on error
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
                            <CardTitle>Подтверждаем ваш email...</CardTitle>
                            <CardDescription>Пожалуйста, подождите, пока мы проверяем ваш токен.</CardDescription>
                        </div>
                    )
                case "success":
                    return (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <CheckCircle className="size-12 text-green-500" />
                            <CardTitle>Email подтвержден!</CardTitle>
                            <CardDescription>
                                Ваш аккаунт успешно подтвержден. Вы будете перенаправлены на страницу входа через несколько секунд.
                            </CardDescription>
                            <Button onClick={() => router.push("/auth")}>Перейти к входу</Button>
                        </div>
                    )
                case "error":
                    return (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <AlertTriangle className="size-12 text-red-500" />
                            <CardTitle>Ошибка подтверждения</CardTitle>
                            <CardDescription>
                                {error || "Ссылка подтверждения недействительна или срок ее действия истек."}
                            </CardDescription>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => router.push("/auth")}>
                                    Назад к входу
                                </Button>
                                {email && (
                                    <Button onClick={() => setStatus("idle")}>
                                        Запросить новую ссылку
                                    </Button>
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
                    <CardTitle>Подтвердите ваш Email</CardTitle>
                    <CardDescription>
                        Мы отправили ссылку подтверждения на <strong>{email || "ваш адрес электронной почты"}</strong>.
                        Пожалуйста, проверьте свою почту и перейдите по ссылке для завершения регистрации.
                    </CardDescription>
                    <Button onClick={handleResend} disabled={resendCooldown > 0 || isLoading} className="w-full">
                        {isLoading
                            ? "Отправляем..."
                            : resendCooldown > 0
                                ? `Повторить через ${resendCooldown}с`
                                : "Отправить письмо повторно"}
                    </Button>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
            )
        }
    }

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
                        <CardContent>{renderContent()}</CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
}