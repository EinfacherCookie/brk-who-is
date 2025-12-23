import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ModeToggle } from '@/components/theme/modeToggle';

export const metadata: Metadata = {
    title: 'BRK - Das bin ich!',
    description: 'Professionelle Profilseite',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
        userScalable: true,
    },
};

const geist = Geist({
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" suppressHydrationWarning className={geist.className}>
            <body className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="theme"
                >
                    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
                        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                            <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                                BRK
                            </div>
                            <ModeToggle />
                        </nav>
                    </header>
                    <main className="min-h-screen">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
