import fs from 'fs';
import path from 'path';
import { ProfileSchema, type Profile } from './schema';

const PROFILES_DIR = path.join(process.cwd(), 'profiles');

export function getAllSlugs(): string[] {
    const files = fs
        .readdirSync(PROFILES_DIR)
        .filter((f) => f.endsWith('.json'));
    return files.map((f) => f.replace('.json', ''));
}

export function getProfileBySlug(slug: string): Profile | null {
    const filePath = path.join(PROFILES_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const parsed = ProfileSchema.safeParse(data);
    if (!parsed.success) {
        console.error(
            `Invalid profile JSON for slug "${slug}":`,
            parsed.error.format()
        );
        return null;
    }
    return parsed.data;
}
