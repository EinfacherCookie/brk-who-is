export default function Home() {
    return (
        <main className="min-h-dvh flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-lg text-center space-y-3 px-4">
                <h1 className="text-xl sm:text-2xl font-semibold">
                    BRK &quot;That&apos;s me&quot; Pages
                </h1>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                    Öffne ein Profil über{' '}
                    <code className="rounded bg-neutral-100 dark:bg-neutral-800 px-2 py-1 text-xs sm:text-sm">
                        /slug
                    </code>{' '}
                    z.B.{' '}
                    <code className="rounded bg-neutral-100 dark:bg-neutral-800 px-2 py-1 text-xs sm:text-sm">
                        /moritz-mustermann
                    </code>
                </p>
            </div>
        </main>
    );
}
