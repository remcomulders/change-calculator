import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/components/provider/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuroraBackground } from "@/components/ui/aurora-background";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Change Calculator",
    description: "Created by Remco Mulders",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <QueryProvider>
                    <AuroraBackground>{children}</AuroraBackground>
                </QueryProvider>
                <Toaster />
            </body>
        </html>
    );
}
