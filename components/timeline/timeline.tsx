import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

/**
 * Timeline - Container für die gesamte Timeline
 * Nur ein einfacher Wrapper ohne spezielle Styles
 */
const Timeline = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
));
Timeline.displayName = 'Timeline';

/**
 * TimelineItem - Einzelner Eintrag in der Timeline
 *
 * WICHTIGE KLASSEN ZUM ANPASSEN:
 * - pb-6 sm:pb-8: Abstand nach unten zum nächsten Eintrag (responsive)
 * - pl-3 sm:pl-4: Linkes Padding für den gesamten Content (responsive)
 *         → Bestimmt wie weit der Text von der Timeline-Linie entfernt ist
 */
const TimelineItem = React.forwardRef<
    HTMLDivElement,
    React.LiHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('group relative pb-6 sm:pb-8 pl-3 sm:pl-4', className)}
        {...props}
    />
));
TimelineItem.displayName = 'TimelineItem';

/**
 * TimelineHeader - Enthält Title, Time Badge und die Timeline-Linie + Kugel
 *
 * TIMELINE-LINIE (before: pseudo-element):
 * - before:-left-5 sm:before:-left-6: Position der Linie (responsive)
 * - before:h-full: Linie geht über die volle Höhe
 * - before:translate-y-2 sm:before:translate-y-3: Startet nach unten (responsive)
 * - before:bg-slate-300: Farbe der Linie (grau)
 * - before:w-0.5: Breite der Linie (2px)
 * - group-last:before:hidden: Versteckt die Linie beim letzten Eintrag
 *
 * TIMELINE-KUGEL (after: pseudo-element):
 * - after:-left-6 sm:after:-left-7.25: Horizontale Position (responsive)
 * - after:top-1 sm:after:top-1.5: Vertikale Position (responsive)
 * - after:h-2.5 sm:after:h-3 after:w-2.5 sm:after:w-3: Größe der Kugel (responsive)
 * - after:rounded-full: Macht es rund
 * - after:border-2: Border-Dicke (2px)
 * - after:border-white: Border-Farbe hell
 * - dark:after:border-neutral-900: Border-Farbe dunkel
 * - after:bg-foreground: Füllfarbe der Kugel
 */
const TimelineHeader = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'mb-1 flex flex-col items-start before:absolute before:-left-2 sm:before:-left-2 before:h-full before:translate-y-2 sm:before:translate-y-3 before:self-start before:bg-slate-300 before:w-0.5 after:absolute after:-left-3 sm:after:-left-3.25 after:top-1 sm:after:top-1.5 after:h-2.5 sm:after:h-3 after:w-2.5 sm:after:w-3 after:rounded-full after:border-2 after:border-white dark:after:border-neutral-900 after:bg-foreground group-last:before:hidden',
            className
        )}
        {...props}
    />
));
TimelineHeader.displayName = 'TimelineHeader';

/**
 * TimelineTitle - Titel des Timeline-Eintrags (z.B. Position/Rolle)
 *
 * WICHTIGE KLASSEN ZUM ANPASSEN:
 * - text-base sm:text-xl: Schriftgröße (responsive) → HIER GRÖßE ÄNDERN!
 * - font-bold: Fettschrift
 * - text-primary: Farbe (nutzt Theme-Farbe)
 */
const TimelineTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('sm:text-6xl text-6xl font-bold text-primary', className)}
        {...props}
    >
        {children}
    </div>
));
TimelineTitle.displayName = 'TimelineTitle';

/**
 * TimelineTime - Badge für das Datum/Zeitraum
 *
 * WICHTIGE KLASSEN ZUM ANPASSEN:
 * - mb-2 sm:mb-3: Abstand nach unten (responsive)
 * - h-5 sm:h-6: Höhe des Badges (responsive) → HIER HÖHE ÄNDERN!
 * - w-auto: Breite passt sich automatisch an
 * - text-xs: Schriftgröße (12px) → HIER GRÖßE ÄNDERN!
 * - uppercase: Text in Großbuchstaben
 *
 * Die Farbe wird über die 'variant' prop gesteuert (outline, default, etc.)
 */
const TimelineTime = ({
    className,
    variant = 'default',
    ...props
}: React.ComponentProps<typeof Badge>) => {
    return (
        <Badge
            className={cn(
                'inline-flex h-5 sm:h-6 w-auto items-center justify-center text-xs font-semibold uppercase',
                className
            )}
            variant={variant}
            {...props}
        >
            {props.children}
        </Badge>
    );
};
TimelineTime.displayName = 'TimelineTime';

/**
 * TimelineDescription - Beschreibungstext
 *
 * WICHTIGE KLASSEN ZUM ANPASSEN:
 * - text-muted-foreground: Gedämpfte Textfarbe (grau)
 *
 * Weitere Styles werden in der Career-Komponente hinzugefügt
 */
const TimelineDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('text-muted-foreground', className)}
        {...props}
    />
));
TimelineDescription.displayName = 'TimelineDescription';

export {
    Timeline,
    TimelineItem,
    TimelineHeader,
    TimelineTime,
    TimelineTitle,
    TimelineDescription,
};
