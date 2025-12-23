'use client';

import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

export type ProfileLink = { label: string; href: string; icon?: string };

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    mail: Icons.Mail,
    instagram: Icons.Instagram,
    github: Icons.Github,
    linkedin: Icons.Linkedin,
    twitter: Icons.Twitter,
    globe: Icons.Globe,
    phone: Icons.Phone,
    mapPin: Icons.MapPin,
    external: Icons.ExternalLink,
};

export function LinkButtons({
    links,
    accent,
}: {
    links: ProfileLink[];
    accent?: string;
}) {
    return (
        <div className="grid gap-3 ">
            {links.map((l) => {
                const IconComponent = l.icon ? iconMap[l.icon] : null;

                return (
                    <div key={l.href} className="cursor-pointer">
                        <a
                            href={l.href}
                            target={
                                l.href.startsWith('http') ? '_blank' : undefined
                            }
                            rel={
                                l.href.startsWith('http')
                                    ? 'noreferrer'
                                    : undefined
                            }
                            className="block group cursor-pointer"
                        >
                            <Button
                                className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: accent,
                                    borderColor: accent,
                                }}
                            >
                                {IconComponent && (
                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                                )}
                                <span>{l.label}</span>
                            </Button>
                        </a>
                    </div>
                );
            })}
        </div>
    );
}
