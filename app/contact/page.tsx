"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Clock, Globe, MessageCircle } from "lucide-react"
import { Instagram, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

export default function ContactPage() {
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
                    className="w-full max-w-2xl"
                >
                    <section className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Get in Touch</h1>
                    </section>

                    <section className="mb-12 grid md:grid-cols-2 gap-8">
                        <Card className="bg-gradient-to-br from-primary/10 to-muted/0 border-none">
                            <CardContent className="p-8 flex flex-col items-center">
                                <Mail className="size-8 text-primary mb-2" />
                                <h2 className="text-xl font-semibold mb-2">Email Us</h2>
                                <a href="mailto:support@yourmegan.me" className="text-primary underline text-lg font-medium mb-1">support@yourmegan.me</a>
                                <span className="text-muted-foreground text-sm">We typically respond within 24 hours</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-secondary/10 to-muted/0 border-none">
                            <CardContent className="p-8 flex flex-col items-center">
                                <Clock className="size-8 text-primary mb-2" />
                                <h2 className="text-xl font-semibold mb-2">Response Time</h2>
                                <span className="text-lg font-medium mb-1">24 hours</span>
                                <span className="text-muted-foreground text-sm">Average response time for all inquiries</span>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mb-12 grid md:grid-cols-2 gap-8">
                        <Card className="bg-gradient-to-br from-primary/10 to-muted/0 border-none">
                            <CardContent className="p-8 flex flex-col items-center">
                                <Globe className="size-8 text-primary mb-2" />
                                <h2 className="text-xl font-semibold mb-2">Based in</h2>
                                <span className="text-lg font-medium mb-1">Remote First</span>
                                <span className="text-muted-foreground text-sm">Working across timezones to serve you better</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-secondary/10 to-muted/0 border-none">
                            <CardContent className="p-8 flex flex-col items-center">
                                <MessageCircle className="size-8 text-primary mb-2" />
                                <h2 className="text-xl font-semibold mb-2">Quick Help</h2>
                                <span className="text-lg font-medium mb-1">Looking for immediate answers?</span>
                                <Link href="/#faq" className="text-primary underline">Check out our FAQ section</Link>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-center">Follow Us</h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="flex flex-col items-center">
                                <Instagram className="size-8 text-primary mb-2" />
                                <span className="font-semibold">Instagram</span>
                                <span className="text-muted-foreground text-sm">Behind the Scenes</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Linkedin className="size-8 text-primary mb-2" />
                                <span className="font-semibold">LinkedIn</span>
                                <span className="text-muted-foreground text-sm">Professional Updates</span>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </main>
        </div>
    )
} 