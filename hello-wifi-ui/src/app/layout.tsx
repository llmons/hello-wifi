import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import React from "react";

export const metadata: Metadata = {
    title: "Hello WiFi",
    description: "A WiFi management app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
