"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

export default function PrivacyPage() {
    const { theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => { setMounted(true); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
            <header className="w-full border-b bg-background/95 backdrop-blur-sm">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                            {mounted && (
                                <img src={theme === "dark" ? "/icon-black-bg.png" : "/icon-white-bg.png"} alt="Megan" className="size-8" />
                            )}
                        </div>
                        <span>Megan</span>
                    </Link>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-3xl"
                >
                    <Card className="border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur shadow-xl">
                        <CardContent className="p-8">
                            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Privacy Policy for Megan (Chrome Extension)</h1>
                            <p className="mb-4 text-muted-foreground text-sm text-center">Effective Date: July 7, 2025</p>
                            <p className="mb-8 text-center text-muted-foreground text-sm">Developer Contact: <a href="mailto:your-email@example.com" className="text-primary underline">your-email@example.com</a></p>

                            {/* ENGLISH VERSION */}
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                                <p>Megan is a Chrome extension that enables voice control of the browser and provides AI-powered tools such as an AI chatbot, translation, summarization, note-taking, and media playback. The extension's voice assistant can answer user questions conversationally, open and close tabs, open URLs, media, and links (only when opening a URL), and create notes based on user requests. We are committed to protecting your privacy and ensuring transparency regarding the data we collect, use, and store. This Privacy Policy explains our practices in detail.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
                                <p>When you register for Megan, we collect your email address, password, and name. <b>Passwords are never stored in plain text; instead, we use bcrypt or other industry-standard cryptographic hashing algorithms to protect your credentials.</b> This information is stored securely using industry best practices and is never shared with unauthorized third parties.</p>
                                <p className="mt-2">Megan does <b>not</b> collect or store your browsing history or other personally identifiable information (PII) beyond what is required for registration and account management.</p>
                                <p className="mt-2">Your chat history with the AI chatbot is saved to provide you with a seamless and continuous experience. However, all voice commands and requests given to the voice assistant are deleted immediately after processing and responding to the user—they are never stored or retained.</p>
                                <p className="mt-2">We use Google Analytics to collect anonymous usage data, including:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Extension usage frequency</li>
                                    <li>Button or feature usage</li>
                                    <li>Errors or crashes (anonymized)</li>
                                </ul>
                                <p className="mt-2">This data helps us improve extension performance and user experience.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">2. Use of Google Analytics</h2>
                                <p>We use Google Analytics for Firebase (or GA4) to track aggregated, anonymous usage metrics. Google Analytics may set cookies or use identifiers. No personally identifiable data is transmitted.</p>
                                <p className="mt-2">For more information, please see: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Partner Sites Policy</a></p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">3. Use of APIs</h2>
                                <p>Megan may send content (e.g., page text or voice input) to external APIs such as OpenAI or Google Translate to perform requested tasks. All requests are encrypted (HTTPS), and no user-identifiable data is stored or shared.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">4. Permissions</h2>
                                <p>Megan requests only the permissions necessary for its operation (e.g., microphone, activeTab, storage). These are used strictly to enable functionality and not for tracking or profiling users.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">5. Advertising</h2>
                                <p>Megan does not display ads and does not use collected data for advertising or marketing purposes.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">6. Data Security</h2>
                                <p>All API communications and analytics data transfers are encrypted via HTTPS. We follow industry best practices to protect your data, including your registration information, from unauthorized access, disclosure, alteration, or destruction.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
                                <p>We may update this Privacy Policy to reflect changes in features or legal requirements. Updates will be posted on this page and noted in the Chrome Web Store listing. We encourage you to review this policy periodically.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
                                <p>If you have any questions or concerns regarding this policy, contact us at: <a href="mailto:your-email@example.com" className="text-primary underline">your-email@example.com</a></p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">9. Data Deletion and User Rights</h2>
                                <p>You have the right to request deletion of your personal data at any time by contacting us at <a href="mailto:your-email@example.com" className="text-primary underline">your-email@example.com</a>. Additionally, you can delete your account and all associated data directly from your account page. When you delete your account, all data linked to your account—including registration information, notes and chat history—will be permanently removed from our systems.</p>
                            </section>

                            {/* --- Uncomment below for Russian translation or use i18n for dynamic switching --- */}
                            {/*
                            <hr className="my-8" />
                            <h1 className="text-2xl font-bold mb-4 text-center">Политика конфиденциальности для Megan (Chrome Extension)</h1>
                            <p className="mb-4 text-muted-foreground text-sm text-center">Дата вступления в силу: 7 июля 2025</p>
                            <p className="mb-8 text-center text-muted-foreground text-sm">Контакт разработчика: <a href="mailto:your-email@example.com" className="text-primary underline">your-email@example.com</a></p>
                            ...
                            */}
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
} 