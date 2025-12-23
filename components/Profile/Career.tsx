'use client';

import { CareerEntry } from '@/profiles/schema';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
    Timeline,
    TimelineItem,
    TimelineHeader,
    TimelineTitle,
    TimelineTime,
    TimelineDescription,
} from '../timeline/timeline';

// Funktion zum Generieren des aktuellen Monats und Jahres
const getCurrentMonthYear = (): string => {
    const date = new Date();
    const months = [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Funktion zum Verarbeiten von Einträgen und automatisches Datum für aktuelle Positionen
const processEntries = (entries: CareerEntry[]): CareerEntry[] => {
    return entries.map((entry) => {
        if (entry.isCurrent && !entry.startDate) {
            return {
                ...entry,
                startDate: getCurrentMonthYear(),
            };
        }
        return entry;
    });
};

export function Career({
    entries,
    accent,
}: {
    entries: CareerEntry[];
    accent?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const processedEntries = processEntries(entries);

    if (!processedEntries || processedEntries.length === 0) return null;

    return (
        <div>
            {/* Accordion Header - Subtle Text Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-2 mb-4 sm:mb-6 transition-all duration-300 hover:opacity-70 w-full cursor-pointer active:scale-95"
            >
                <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-50 uppercase tracking-wide text-left transition-colors duration-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                    LAUFBAHN{' '}
                    <span className="text-neutral-500 dark:text-neutral-400">
                        — {processedEntries.length}{' '}
                        {processedEntries.length === 1 ? 'Eintrag' : 'Einträge'}
                    </span>
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-neutral-400 dark:text-neutral-600 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Timeline Content */}
            {isOpen && (
                <Timeline className="mt-4 animate-slide-down">
                    {processedEntries.map((entry, idx) => (
                        <TimelineItem
                            key={idx}
                            style={{ animationDelay: `${idx * 75}ms` }}
                            className="animate-fade-in-up"
                        >
                            <TimelineHeader>
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                    <TimelineTime variant="outline">
                                        {!entry.endDate && (
                                            <span className="hidden sm:inline">
                                                seit{' '}
                                            </span>
                                        )}
                                        {entry.startDate}
                                        {entry.endDate && ` - ${entry.endDate}`}
                                    </TimelineTime>
                                    {entry.isCurrent && (
                                        <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full border border-green-200 dark:border-green-800 h-fit transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                                            Aktuell
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <TimelineTitle className="text-neutral-900 dark:text-neutral-50 text-sm sm:text-base font-bold">
                                        {entry.position}
                                    </TimelineTitle>
                                    <p className="text-xs sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
                                        {entry.organization}
                                    </p>
                                </div>
                            </TimelineHeader>
                            {entry.description && (
                                <TimelineDescription className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
                                    {entry.description}
                                </TimelineDescription>
                            )}
                        </TimelineItem>
                    ))}
                </Timeline>
            )}
        </div>
    );
}
