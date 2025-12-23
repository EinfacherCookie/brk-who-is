import { notFound } from 'next/navigation';
import { getAllSlugs, getProfileBySlug } from '@/profiles';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { Badges } from '@/components/Profile/Badges';
import { Career } from '@/components/Profile/Career';
import { LinkButtons } from '@/components/Profile/LinkButtons';
import { QRCodeGenerator } from '@/components/Profile/QRCodeGenerator';
import { QRCodeFooterButton } from '@/components/Profile/QRCodeFooterButton';

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const profile = getProfileBySlug(slug);
    if (!profile) return notFound();

    const accent = profile.theme?.accent ?? '#E30613';

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 pt-8 sm:pt-12 lg:pt-20 pb-8 sm:pb-12">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-red-100 dark:bg-red-950 rounded-full blur-3xl opacity-20 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100 dark:bg-blue-950 rounded-full blur-3xl opacity-20 -z-10"></div>
            </div>

            <div className="mx-auto max-w-2xl px-3 sm:px-4 lg:px-8">
                {/* Main card */}
                <div className="relative">
                    <div className="relative bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl dark:shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                        {/* Accent bar */}
                        <div
                            className="h-1"
                            style={{ backgroundColor: accent }}
                        ></div>

                        <div className="p-6 sm:p-8 lg:p-12">
                            <div className="space-y-4 sm:space-y-4">
                                {/* Profile Header */}
                                <div>
                                    <ProfileHeader
                                        name={profile.name}
                                        qualifications={profile.qualifications}
                                        orgLine={profile.orgLine}
                                        avatar={profile.avatar}
                                        accentColor={accent}
                                    />
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent"></div>

                                {/* Bio */}
                                {profile.bio && (
                                    <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-light">
                                        {profile.bio}
                                    </p>
                                )}

                                {/* Badges */}
                                {profile.badges &&
                                    profile.badges.length > 0 && (
                                        <div>
                                            <Badges badges={profile.badges} />
                                        </div>
                                    )}

                                {/* Links Section */}
                                {profile.links && profile.links.length > 0 && (
                                    <div className="pt-2 sm:pt-4">
                                        <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6 uppercase tracking-wide ">
                                            Verbindungen
                                        </h3>
                                        <LinkButtons
                                            links={profile.links}
                                            accent={accent}
                                        />
                                    </div>
                                )}

                                {/* Career Timeline */}
                                {profile.career &&
                                    profile.career.length > 0 && (
                                        <div>
                                            <Career
                                                entries={profile.career}
                                                accent={accent}
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 sm:px-8 lg:px-12 py-4 sm:py-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/30">
                            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
                                <a
                                    className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors font-medium"
                                    href="/impressum"
                                >
                                    Impressum
                                </a>
                                <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">
                                    ·
                                </span>
                                <a
                                    className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors font-medium"
                                    href="/datenschutz"
                                >
                                    Datenschutz
                                </a>
                                <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">
                                    ·
                                </span>
                                <QRCodeFooterButton
                                    name={profile.name}
                                    slug={slug}
                                    accent={accent}
                                />
                                <span className="sm:ml-auto text-neutral-400 dark:text-neutral-600 mt-2 sm:mt-0">
                                    © {new Date().getFullYear()} BRK KV
                                    Nürnberg-Stadt
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
