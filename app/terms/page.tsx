"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

export default function TermsPage() {
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
                            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Terms of Service for Megan (Chrome Extension)</h1>
                            <p className="mb-4 text-muted-foreground text-sm text-center">Last updated: July 7, 2025</p>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
                                <p>By installing or using the Megan Chrome Extension ("Megan", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our service.</p>
                                <p className="mt-2">We may update these terms periodically. Continued use of the extension after such updates constitutes acceptance of the revised terms.</p>
                                <p className="mt-2">You must be at least 13 years old to use Megan. If you are under 18, you must obtain consent from a parent or legal guardian.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Service Description</h2>
                                <p>Megan is an AI-powered browser extension that enables voice control of browser actions and provides productivity features, including:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>AI chatbot for Q&amp;A</li>
                                    <li>Real-time tab and URL management</li>
                                    <li>Media playback via commands</li>
                                    <li>Voice-activated note creation</li>
                                    <li>Built-in translation and summarization tools</li>
                                </ul>
                                <p className="mt-2">Megan may integrate with external APIs and services, including but not limited to OpenAI, Google Analytics, Gemini, SMTP, googletrans, ElevenLabs and others, to provide and enhance its features.</p>
                                <p className="mt-2">Features may vary between current and future versions. We reserve the right to modify, enhance, or discontinue any features with or without notice.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
                                <p>You are responsible for:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Maintaining the confidentiality of your account credentials</li>
                                    <li>Providing accurate registration data</li>
                                    <li>Using Megan only for lawful purposes and in compliance with applicable laws and regulations</li>
                                </ul>
                                <p className="mt-2">You agree not to:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Reverse-engineer, copy, or tamper with any part of the extension</li>
                                    <li>Use Megan for unauthorized automation or scraping</li>
                                    <li>Interfere with the operation of our servers or services</li>
                                    <li>Circumvent usage restrictions or limitations</li>
                                </ul>
                                <p className="mt-2">Please report any bugs or security issues to <a href="mailto:support@yourmegan.me" className="text-primary underline">support@yourmegan.me</a>.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Privacy and Data</h2>
                                <p>Your use of Megan is also subject to our <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>, which describes how we collect, use, and protect your information. Megan does not store voice recordings and does not track browsing history. Some usage analytics are collected anonymously via Google Analytics.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
                                <p>All rights to Megan, including its source code, branding, logos, design, and content, belong to the Megan development team.</p>
                                <p className="mt-2">You may not:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Copy, distribute, or resell the extension</li>
                                    <li>Modify or create derivative works</li>
                                    <li>Use our trademarks without prior written consent</li>
                                </ul>
                                <p className="mt-2">User-generated content such as notes or chats remains your property, but by using the extension, you grant us a limited license to process and store it as needed to provide the service.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Service Availability</h2>
                                <p>We strive to maintain a high level of uptime and reliability, but we do not guarantee uninterrupted availability.</p>
                                <p className="mt-2">Beta features may be experimental and may change or be removed without notice. Scheduled maintenance or technical issues may temporarily affect performance.</p>
                                <p className="mt-2">We reserve the right to suspend or restrict access for security, legal compliance, abuse, or misuse.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Prohibited Conduct</h2>
                                <p>You may not use Megan to:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Violate any applicable law or regulation</li>
                                    <li>Upload or transmit malicious code</li>
                                    <li>Attempt to gain unauthorized access to systems</li>
                                    <li>Harass, impersonate, or harm others</li>
                                    <li>Use automated tools to exploit the service</li>
                                </ul>
                                <p className="mt-2">Violations may result in immediate suspension or termination of access.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Disclaimer and Limitation of Liability</h2>
                                <p>Megan is provided "as is" without warranties of any kind. We do not guarantee error-free operation, compatibility, or accuracy of AI responses.</p>
                                <p className="mt-2">To the fullest extent permitted by law, we disclaim liability for any direct, indirect, incidental, or consequential damages arising from the use of Megan.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Governing Law</h2>
                                <p>These Terms are governed by the laws of the Republic of Kazakhstan (or your applicable legal jurisdiction if specified otherwise).</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Contact</h2>
                                <p>For questions, feedback, or legal inquiries, contact us at:<br /><a href="mailto:support@yourmegan.me" className="text-primary underline">support@yourmegan.me</a></p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Termination</h2>
                                <p>You may terminate your use of Megan at any time by uninstalling the extension from your browser. Upon uninstallation, the extension will no longer have access to your browser or data. If you wish to delete your account and all associated data, you may do so from your account page or by contacting support. We reserve the right to suspend or terminate your access to Megan at our discretion, including for violations of these Terms or applicable law.</p>
                            </section>

                            {/* --- Uncomment below for Russian translation or use i18n for dynamic switching --- */}
                            {/*
              <hr className="my-8" />
              <h1 className="text-2xl font-bold mb-4 text-center">Пользовательское соглашение для Megan (Chrome Extension)</h1>
              <p className="mb-4 text-muted-foreground text-sm text-center">Последнее обновление: 7 июля 2025</p>
              ...
              */}
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
} 