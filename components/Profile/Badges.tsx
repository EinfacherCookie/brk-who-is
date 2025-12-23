export function Badges({ badges }: { badges?: string[] }) {
    if (!badges?.length) return null;

    return (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 animate-fade-in">
            {badges.map((b, idx) => (
                <span
                    key={b}
                    className="rounded-full border border-neutral-200 dark:border-neutral-700 px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-neutral-700 dark:text-neutral-300 bg-white/60 dark:bg-neutral-800/60 transition-all duration-300 cursor-pointer hover:scale-105 hover:border-neutral-400 dark:hover:border-neutral-500 hover:shadow-sm hover:bg-white/80 dark:hover:bg-neutral-800/80"
                    style={{
                        animationDelay: `${idx * 75}ms`,
                    }}
                >
                    {b}
                </span>
            ))}
        </div>
    );
}
