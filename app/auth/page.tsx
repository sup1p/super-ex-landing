"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { setToken, isAuthenticated, removeToken } from "@/utils/auth"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

// Константа с URL бэкенда
const API_URL = 'http://localhost:8000' // Замените на ваш URL

export default function AuthPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  })

  const { fetchWithAuth } = useAuth()
  const { locale } = useLanguage()
  const t = useTranslations(locale)

  const handleTabChange = (value: string) => {
    // Reset all states when switching tabs
    setAuthError(null)
    setAuthSuccess(false)
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: ""
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    // Handle confirm-password separately
    if (id === 'confirm-password') {
      setFormData(prev => ({
        ...prev,
        confirmPassword: value
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [id.replace('login-', '').replace('register-', '')]: value
      }))
    }
    // Clear error when user starts typing
    setAuthError(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError(null)
    setAuthSuccess(false)

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setAuthError(t('invalidEmailOrPassword'))
          throw new Error(t('invalidEmailOrPassword'))
        } else if (response.status === 403) {
          setAuthError(t('accountBlocked'))
          throw new Error(t('accountBlocked'))
        } else if (response.status === 429) {
          setAuthError(t('tooManyAttempts'))
          throw new Error(t('tooManyAttempts'))
        } else {
          setAuthError(data.message || t('failedToLogin'))
          throw new Error(data.message || t('failedToLogin'))
        }
      }

      // Сохраняем JWT токен и данные пользователя
      if (data.access_token) {
        setToken(data.access_token)

        try {
          const response = await fetch(`${API_URL}/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          })

          const data = await response.json()


          if (!response.ok) {
            if (response.status === 401) {
              setAuthError(t('invalidEmailOrPassword'))
              throw new Error(t('invalidEmailOrPassword'))
            } else if (response.status === 403) {
              setAuthError(t('accountBlocked'))
              throw new Error(t('accountBlocked'))
            } else if (response.status === 429) {
              setAuthError(t('tooManyAttempts'))
              throw new Error(t('tooManyAttempts'))
            } else {
              setAuthError(data.message || t('failedToLogin'))
              throw new Error(data.message || t('failedToLogin'))
            }
          }

          localStorage.setItem('userEmail', data.email)
          localStorage.setItem('userName', data.name)
          localStorage.setItem('userId', data.id)
        } catch (error) {
          // Показываем ошибку в зависимости от типа ошибки
          if (error instanceof Error) {
            if (error.message.includes('Failed to fetch')) {
              setAuthError(t('unableToConnect'))
              toast.error(t('unableToConnect'))
            } else {
              toast.error(error.message)
            }
          } else {
            setAuthError(t('unexpectedError'))
            toast.error(t('unexpectedError'))
          }
        } finally {
          setIsLoading(false)
        }

        setAuthSuccess(true)
        toast.success(t('successfullyLoggedIn'))

        // Добавляем небольшую задержку перед редиректом
        setTimeout(() => {
          router.push('/')
          router.refresh() // Принудительно обновляем страницу
        }, 100)
      } else {
        setAuthError(t('noAccessToken'))
        throw new Error(t('noAccessToken'))
      }
    } catch (error) {
      // Показываем ошибку в зависимости от типа ошибки
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          setAuthError(t('unableToConnect'))
          toast.error(t('unableToConnect'))
        } else {
          toast.error(error.message)
        }
      } else {
        setAuthError(t('unexpectedError'))
        toast.error(t('unexpectedError'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError(null)
    setAuthSuccess(false)

    if (formData.password !== formData.confirmPassword) {
      setAuthError(t('passwordsDoNotMatch'))
      toast.error(t('passwordsDoNotMatch'))
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/auth/pre-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Based on the new backend, 400 is used for existing email
        if (response.status === 400 && data.detail?.includes("Email уже используется")) {
          setAuthError(t('emailAlreadyExists'))
          throw new Error(t('emailAlreadyExists'))
        }
        setAuthError(data.detail || t('failedToRegister'))
        throw new Error(data.detail || t('failedToRegister'))
      }

      // On success, redirect to the confirmation page
      toast.success(t('confirmationEmailSent'))
      router.push(`/confirm-email?email=${encodeURIComponent(formData.email)}`)

    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          setAuthError(t('unableToConnect'))
          toast.error(t('unableToConnect'))
        } else {
          // The error message from the throw is already set as authError
          toast.error(error.message)
        }
      } else {
        setAuthError(t('unexpectedError'))
        toast.error(t('unexpectedError'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Добавим функцию для выхода
  const handleLogout = () => {
    removeToken()
    router.push('/auth')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
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
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">{t('welcomeToMegan')}</CardTitle>
              <CardDescription>{t('signInDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full" onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">{t('signIn')}</TabsTrigger>
                  <TabsTrigger value="register">{t('signUp')}</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    {authError && (
                      <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                        {authError}
                      </div>
                    )}
                    {authSuccess && (
                      <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                        {t('successfullyAuthenticated')}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{t('email')}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder={t('enterEmail')}
                          className={`pl-10 ${authError ? 'border-red-500 focus-visible:ring-red-500' : authSuccess ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t('password')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t('enterPassword')}
                          className={`pl-10 pr-10 ${authError ? 'border-red-500 focus-visible:ring-red-500' : authSuccess ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4 text-muted-foreground" />
                          ) : (
                            <Eye className="size-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input id="remember" type="checkbox" className="rounded border-border" />
                        <Label htmlFor="remember" className="text-sm">
                          {t('rememberMe')}
                        </Label>
                      </div>
                      <Link href="#" className="text-sm text-primary hover:underline">
                        {t('forgotPassword')}
                      </Link>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-purple-1200 hover:from-purple-600 hover:to-purple-700 text-white border-none" disabled={isLoading}>
                      {isLoading ? t('signingIn') : t('signIn')}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    {authError && (
                      <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                        {authError}
                      </div>
                    )}
                    {authSuccess && (
                      <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                        {t('successfullyRegistered')}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="register-name">{t('fullName')}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder={t('enterFullName')}
                          className={`pl-10 ${authError ? 'border-red-500 focus-visible:ring-red-500' : authSuccess ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">{t('email')}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder={t('enterEmail')}
                          className={`pl-10 ${authError ? 'border-red-500 focus-visible:ring-red-500' : authSuccess ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">{t('password')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t('createPassword')}
                          className={`pl-10 pr-10 ${authError ? 'border-red-500 focus-visible:ring-red-500' : authSuccess ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4 text-muted-foreground" />
                          ) : (
                            <Eye className="size-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t('confirmYourPassword')}
                          className={`pl-10 pr-10 ${authError ? 'border-red-500 focus-visible:ring-red-500' : authSuccess ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-4 text-muted-foreground" />
                          ) : (
                            <Eye className="size-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input id="terms" type="checkbox" className="rounded border-border" required />
                      <Label htmlFor="terms" className="text-sm">
                        {t('iAgreeTo')}{" "}
                        <Link href="#" className="text-primary hover:underline">
                          {t('termsOfService')}
                        </Link>{" "}
                        {t('and')}{" "}
                        <Link href="#" className="text-primary hover:underline">
                          {t('privacyPolicy')}
                        </Link>
                      </Label>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-purple-1200 hover:from-purple-600 hover:to-purple-700 text-white border-none" disabled={isLoading}>
                      {isLoading ? t('creatingAccount') : t('createAccount')}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">{t('orContinueWith')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <svg className="mr-2 size-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="mr-2 size-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      Twitter
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
