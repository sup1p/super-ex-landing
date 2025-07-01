"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Lock, Trash2, CreditCard, Users, Zap, Copy, Check, Crown, Gift, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { removeToken } from "@/utils/auth"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AccountPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("account")
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const { locale } = useLanguage()
    const t = useTranslations(locale)
    const [userData, setUserData] = useState<{
        name?: string
        email?: string
        avatar?: string
        id?: string
    }>({
        name: undefined,
        email: undefined,
        avatar: undefined,
        id: undefined
    })
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    useEffect(() => {
        // Fetch user data
        const name = typeof window !== 'undefined' ? localStorage.getItem('userName') || undefined : undefined
        const email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') || undefined : undefined
        const avatar = typeof window !== 'undefined' ? localStorage.getItem('userAvatar') || undefined : undefined
        const id = typeof window !== 'undefined' ? localStorage.getItem('userId') || undefined : undefined
        setUserData({ name, email, avatar, id })
    }, [])

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords don't match")
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch(`${API_URL}/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    current_password: passwordData.currentPassword,
                    new_password: passwordData.newPassword
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to change password')
            }

            toast.success('Password changed successfully')
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            })
        } catch (error) {
            toast.error('Failed to change password')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteAccount = async () => {
        if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`${API_URL}/user/delete/${userData.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            if (!response.ok) {
                throw new Error('Failed to delete account')
            }

            removeToken()
            localStorage.removeItem('userEmail')
            toast.success('Account deleted successfully')
            router.push('/auth')
        } catch (error) {
            toast.error('Failed to delete account')
        } finally {
            setIsLoading(false)
        }
    }

    const copyReferralLink = async () => {
        const link = `https://Megan.com/ref/${userData.email}`
        try {
            await navigator.clipboard.writeText(link)
            setCopied(true)
            toast.success('Referral link copied!')
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error('Failed to copy link')
        }
    }

    const tabVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
    }

    return (
        <div className="min-h-screen flex bg-white dark:bg-black">
            <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-white via-transparent to-white dark:from-black dark:via-purple-900/20 dark:to-black"></div>

            {/* Enhanced Sidebar */}
            <div className="w-72 border-r border-purple-200/10 dark:border-purple-900/20 bg-white/80 dark:bg-black/80 backdrop-blur-xl p-6 shadow-2xl">
                <div className="space-y-6">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 font-bold text-xl mb-8"
                    >
                        <Link href="/">
                            <img src="/icon.png" alt="Megan" className="size-10" />
                        </Link>
                        <span className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-500 bg-clip-text text-transparent">Megan</span>
                    </motion.div>
                    <LanguageSwitcher />

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 rounded-lg bg-gradient-to-br from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20 border border-purple-200/20 dark:border-purple-900/30"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12 ring-2 ring-white dark:ring-black">
                                <AvatarImage src={userData.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-purple-700 to-purple-900 text-white">
                                    {(userData.name && userData.name.charAt(0)) || (userData.email && userData.email.charAt(0)) || ''}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                    {userData.name ? userData.name : t('user')}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{userData.email}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-1 gap-2 bg-purple-100/20 dark:bg-purple-900/10 p-1 rounded-lg">
                            <TabsTrigger
                                value="account"
                                className="justify-start gap-3 h-12 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:shadow-sm rounded-md transition-all"
                                onClick={() => setActiveTab("account")}
                            >
                                <User className="size-4" />
                                <span className="font-medium">{t('account')}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="pro"
                                className="justify-start gap-3 h-12 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:shadow-sm rounded-md transition-all"
                                onClick={() => setActiveTab("pro")}
                            >
                                <Crown className="size-4" />
                                <span className="font-medium">{t('pro')}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="referral"
                                className="justify-start gap-3 h-12 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:shadow-sm rounded-md transition-all"
                                onClick={() => setActiveTab("referral")}
                            >
                                <Gift className="size-4" />
                                <span className="font-medium">{t('referral')}</span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    key={activeTab}
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto"
                >
                    {activeTab === "account" && (
                        <div className="space-y-6">
                            {/* Profile Section */}
                            <Card className="border-purple-200/10 dark:border-purple-900/20 shadow-lg bg-white/80 dark:bg-black/80 backdrop-blur-xl">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                            <User className="size-5 text-purple-700 dark:text-purple-300" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{t('profileSettings')}</CardTitle>
                                            <CardDescription>{t('manageAccountInfo')}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    {/* Profile Info */}
                                    <div className="flex items-center gap-6 p-6 rounded-lg bg-gradient-to-r from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20 border border-purple-200/20 dark:border-purple-900/30">
                                        <Avatar className="size-20 ring-4 ring-white dark:ring-black shadow-lg">
                                            <AvatarImage src={userData.avatar} />
                                            <AvatarFallback className="bg-gradient-to-br from-purple-700 to-purple-900 text-white text-xl font-semibold">
                                                {(userData.name && userData.name.charAt(0)) || (userData.email && userData.email.charAt(0)) || ''}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                                {userData.name ? userData.name : t('user')}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-2">{userData.email}</p>
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                                {t('activeAccount')}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Separator className="bg-purple-200/20 dark:bg-purple-900/30" />

                                    {/* Password Change Form */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                                <Lock className="size-5 text-purple-700 dark:text-purple-300" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">{t('changePassword')}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('updatePasswordSecure')}</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handlePasswordChange} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="current-password" className="text-sm font-medium">{t('currentPassword')}</Label>
                                                    <Input
                                                        id="current-password"
                                                        type="password"
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                                        className="h-11 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="new-password" className="text-sm font-medium">{t('newPassword')}</Label>
                                                    <Input
                                                        id="new-password"
                                                        type="password"
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                                        className="h-11 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirm-password" className="text-sm font-medium">{t('confirmNewPassword')}</Label>
                                                <Input
                                                    id="confirm-password"
                                                    type="password"
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                    className="h-11 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
                                                    required
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="h-11 bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white shadow-lg"
                                            >
                                                {isLoading ? t('updatingPassword') : t('updatePassword')}
                                            </Button>
                                        </form>
                                    </div>

                                    <Separator className="bg-purple-200/20 dark:bg-purple-900/30" />

                                    {/* Danger Zone */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                                                <Shield className="size-5 text-red-700 dark:text-red-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">{t('dangerZone')}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {t('deleteAccountWarning')}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            onClick={handleDeleteAccount}
                                            disabled={isLoading}
                                            className="h-11 bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900 shadow-lg"
                                        >
                                            <Trash2 className="mr-2 size-4" />
                                            {t('deleteAccount')}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "pro" && (
                        <div className="space-y-6">
                            <Card className="border-0 shadow-lg bg-white/80 dark:bg-black/80 backdrop-blur-xl overflow-hidden relative">
                                {/* Blur Overlay */}
                                <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900/20 mx-auto w-fit">
                                            <Crown className="size-8 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Coming Soon</h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">Pro features will be available in the near future</p>
                                            <Button variant="outline" className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                                                <Crown className="mr-2 size-4" />
                                                Notify Me
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-6 text-white">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/20">
                                                <Crown className="size-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl">Pro Features</CardTitle>
                                                <CardDescription className="text-purple-200">
                                                    Unlock premium features and take your experience to the next level
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </div>
                                <CardContent className="p-6 blur-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div className="p-6 rounded-lg border border-purple-200/20 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                                    <Zap className="size-5 text-purple-700 dark:text-purple-300" />
                                                </div>
                                                <h3 className="font-semibold text-lg">Advanced Analytics</h3>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                Get detailed insights, custom reports, and advanced metrics to optimize your workflow.
                                            </p>
                                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                                <li className="flex items-center gap-2">
                                                    <div className="size-1.5 rounded-full bg-purple-600"></div>
                                                    Real-time data visualization
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="size-1.5 rounded-full bg-purple-600"></div>
                                                    Custom dashboard creation
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="size-1.5 rounded-full bg-purple-600"></div>
                                                    Export capabilities
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="p-6 rounded-lg border border-purple-200/20 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                                    <Users className="size-5 text-purple-700 dark:text-purple-300" />
                                                </div>
                                                <h3 className="font-semibold text-lg">Team Collaboration</h3>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                Work seamlessly with your team members and share resources efficiently.
                                            </p>
                                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                                <li className="flex items-center gap-2">
                                                    <div className="size-1.5 rounded-full bg-purple-600"></div>
                                                    Team workspace management
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="size-1.5 rounded-full bg-purple-600"></div>
                                                    Real-time collaboration
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="size-1.5 rounded-full bg-purple-600"></div>
                                                    Role-based permissions
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <Button className="h-12 px-8 bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white shadow-lg text-lg font-semibold">
                                            <Crown className="mr-2 size-5" />
                                            Upgrade to Pro
                                        </Button>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                                            Start your 14-day free trial today
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "referral" && (
                        <div className="space-y-6">
                            <Card className="border-0 shadow-lg bg-white/80 dark:bg-black/80 backdrop-blur-xl relative">
                                {/* Blur Overlay */}
                                <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900/20 mx-auto w-fit">
                                            <Gift className="size-8 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Coming Soon</h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">Referral program will be available in the near future</p>
                                            <Button variant="outline" className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                                                <Gift className="mr-2 size-4" />
                                                Notify Me
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-6 text-white">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/20">
                                                <Gift className="size-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl">Referral Program</CardTitle>
                                                <CardDescription className="text-purple-200">
                                                    Invite friends and earn exclusive rewards
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </div>
                                <CardContent className="p-6 blur-sm">
                                    <div className="space-y-6">
                                        {/* Referral Link */}
                                        <div className="p-6 rounded-lg bg-gradient-to-r from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20 border border-purple-200/20 dark:border-purple-900/30">
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Gift className="size-5 text-purple-700 dark:text-purple-300" />
                                                Your Referral Link
                                            </h3>
                                            <div className="flex gap-3">
                                                <Input
                                                    value={`https://Megan.com/ref/${userData.email}`}
                                                    readOnly
                                                    className="h-12 border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                                />
                                                <Button
                                                    variant="outline"
                                                    onClick={copyReferralLink}
                                                    className="h-12 px-6 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                                >
                                                    {copied ? (
                                                        <>
                                                            <Check className="mr-2 size-4 text-emerald-600" />
                                                            Copied!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="mr-2 size-4" />
                                                            Copy
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                                                Share this link with friends and earn rewards when they sign up!
                                            </p>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-6 rounded-lg border border-purple-200/20 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20 text-center">
                                                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 w-fit mx-auto mb-4">
                                                    <Users className="size-6 text-purple-700 dark:text-purple-300" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Total Referrals</h3>
                                                <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">0</p>
                                            </div>

                                            <div className="p-6 rounded-lg border border-purple-200/20 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20 text-center">
                                                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 w-fit mx-auto mb-4">
                                                    <Gift className="size-6 text-purple-700 dark:text-purple-300" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Earnings</h3>
                                                <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">0</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">free days</p>
                                            </div>

                                            <div className="p-6 rounded-lg border border-purple-200/20 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20 text-center">
                                                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 w-fit mx-auto mb-4">
                                                    <Zap className="size-6 text-purple-700 dark:text-purple-300" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Next Reward</h3>
                                                <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">5</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">referrals</p>
                                            </div>
                                        </div>

                                        {/* Rewards Info */}
                                        <div className="p-6 rounded-lg border border-purple-200/20 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/20 to-purple-100/20 dark:from-purple-900/10 dark:to-black/20">
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Crown className="size-5 text-purple-700 dark:text-purple-300" />
                                                Rewards Program
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">5 referrals</span>
                                                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                                            7 days free
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">10 referrals</span>
                                                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                                            15 days free
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">25 referrals</span>
                                                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                                            1 month free
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">50 referrals</span>
                                                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                                            Lifetime Pro
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    )
}
