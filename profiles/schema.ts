import { z } from 'zod';

export const LinkSchema = z.object({
    label: z.string(),
    href: z.string().url(),
    icon: z.string().optional(), // z.B. "instagram" | "mail" | ...
});

export const CareerEntrySchema = z.object({
    position: z.string(), // z.B. "Rettungssanitäter"
    organization: z.string(), // z.B. "BRK Bereitschaft Nürnberg"
    startDate: z.string().optional(), // z.B. "2020-01" oder "Jan 2020" - wird automatisch gesetzt wenn isCurrent true ist
    endDate: z.string().optional(), // z.B. "2023-06" oder "present"
    description: z.string().optional(), // z.B. "Tätigkeit und Verantwortungen..."
    isCurrent: z.boolean().optional(), // true wenn aktuell - generiert automatisch startDate mit aktuellem Monat/Jahr
});

export const ProfileSchema = z.object({
    slug: z.string(),
    name: z.string(),
    qualifications: z.array(z.string()).optional(), // z.B. ["Rettungssanitäter", "Ausbilder", "SEG-Transport"]
    orgLine: z.string().optional(), // z.B. "BRK Bereitschaft Nürnberg"
    avatar: z.string().optional(), // z.B. "/avatars/moritz.jpg"
    bio: z.string().optional(),
    badges: z.array(z.string()).optional(),
    career: z.array(CareerEntrySchema).optional(), // Laufbahn/Erfahrung
    links: z.array(LinkSchema),
    theme: z
        .object({
            accent: z.string().optional(), // z.B. "#E30613"
        })
        .optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type CareerEntry = z.infer<typeof CareerEntrySchema>;
