import Image from 'next/image';

export function ProfileHeader({
    name,
    qualifications,
    orgLine,
    avatar,
    accentColor,
}: {
    name: string;
    qualifications?: string[];
    orgLine?: string;
    avatar?: string;
    accentColor?: string;
}) {
    return (
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
                {avatar ? (
                    <Image
                        src={avatar}
                        alt={name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center transition-transform duration-300 group-hover:scale-110">
                            <div className="text-lg sm:text-2xl font-bold text-neutral-600 dark:text-neutral-300">
                                {name
                                    .split(' ')
                                    .map((p) => p[0])
                                    .slice(0, 2)
                                    .join('')}
                            </div>
                            <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                                Avatar
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Name */}
            <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 px-4">
                    {name}
                </h1>

                {/* Qualifications */}
                {qualifications && qualifications.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2 animate-fade-in">
                        {qualifications.map((qual, idx) => (
                            <span
                                key={idx}
                                className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-md"
                                style={{
                                    backgroundColor: accentColor
                                        ? `${accentColor}20`
                                        : '#E3061320',
                                    color: accentColor ?? '#E30613',
                                    borderColor: accentColor ?? '#E30613',
                                    animationDelay: `${idx * 50}ms`,
                                }}
                            >
                                {qual}
                            </span>
                        ))}
                    </div>
                )}

                {/* Organization */}
                {orgLine && (
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium tracking-wide uppercase px-4">
                        {orgLine}
                    </p>
                )}
            </div>
        </div>
    );
}
