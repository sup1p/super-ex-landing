"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mic, Globe, Shield, Zap, Users, TrendingUp, CheckCircle } from "lucide-react"
import { useTheme } from "next-themes"

export default function AboutPage() {
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
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-3xl"
                >
                    <section className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">About Megan</h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-2">Your intelligent voice assistant for the browser</p>
                    </section>

                    <section className="mb-12">
                        <Card className="border-none shadow-none bg-gradient-to-br from-primary/10 to-muted/0">
                            <CardContent className="p-8 md:p-12 flex flex-col items-center">
                                <h2 className="text-2xl font-bold mb-2 text-center">Our Mission</h2>
                                <p className="text-center text-muted-foreground text-lg">Empowering users to navigate, control, and utilize the web with speed and clarity through AI-powered voice assistance.</p>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mb-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="flex flex-col items-center">
                                <Users className="size-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">15K+</span>
                                <span className="text-muted-foreground text-sm">Early Adopters</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Mic className="size-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">120K+</span>
                                <span className="text-muted-foreground text-sm">Voice Commands Executed</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Zap className="size-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">80K+</span>
                                <span className="text-muted-foreground text-sm">Web Tasks Automated</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <CheckCircle className="size-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">99.98%</span>
                                <span className="text-muted-foreground text-sm">Uptime</span>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <Card className="border-none shadow-none bg-gradient-to-br from-secondary/10 to-muted/0">
                            <CardContent className="p-8 md:p-12">
                                <h2 className="text-2xl font-bold mb-2 text-center">Our Story</h2>
                                <p className="text-center text-muted-foreground text-lg mb-4">Megan was created to solve a growing problem — the complexity of modern browsing.<br />While working online, we noticed how much time is lost switching tabs, managing tools, and searching for information. Voice assistants existed, but none were optimized for the browser.<br /><br />We decided to change that.<br /><br />Megan combines cutting-edge voice recognition with real AI capabilities to help you take notes, control media, translate content, summarize articles, and manage tabs — all by voice.<br />It's your browser, finally under your control.</p>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-center">Our Principles</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="bg-gradient-to-br from-primary/5 to-muted/0 border-none">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <Mic className="size-7 text-primary mb-2" />
                                    <h3 className="font-semibold mb-1">Voice-First Experience</h3>
                                    <p className="text-center text-muted-foreground">We believe the browser should listen. Megan is built around fast, natural voice commands that work the way you think.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-primary/5 to-muted/0 border-none">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <Globe className="size-7 text-primary mb-2" />
                                    <h3 className="font-semibold mb-1">AI with Purpose</h3>
                                    <p className="text-center text-muted-foreground">Every feature exists to streamline your work — not distract from it. Megan simplifies the web, doesn't complicate it.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-primary/5 to-muted/0 border-none">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <Shield className="size-7 text-primary mb-2" />
                                    <h3 className="font-semibold mb-1">Privacy by Default</h3>
                                    <p className="text-center text-muted-foreground">We don't store voice recordings. We don't track browsing history. Your data remains yours — always.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-primary/5 to-muted/0 border-none">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <TrendingUp className="size-7 text-primary mb-2" />
                                    <h3 className="font-semibold mb-1">Universal Productivity</h3>
                                    <p className="text-center text-muted-foreground">From students to professionals, Megan is designed to serve anyone who wants to do more in less time, without complexity.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section className="mb-12 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4 text-center">Meet the Creator</h2>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex flex-col items-center">
                                <User className="size-16 text-primary mb-2" />
                                <span className="text-lg font-semibold">Omar Sembek</span>
                                <span className="text-muted-foreground text-sm">Founder & Lead Developer</span>
                            </div>
                            <div className="max-w-md text-center md:text-left text-muted-foreground">
                                <p>A developer passionate about AI, voice technology, and making tools that actually help. Megan is the result of months of work to bring browser control to the next level.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
                        <div className="flex flex-col items-center gap-2">
                            <span>General inquiries / support</span>
                            <a href="mailto:support@yourmegan.me" className="text-primary underline text-lg font-medium">support@yourmegan.me</a>
                            <div className="flex gap-4 mt-4">
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">X – News & Announcements</a>
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram – Behind the Scenes</a>
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn – Product & Development Insights</a>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </main>
        </div>
    )
} 