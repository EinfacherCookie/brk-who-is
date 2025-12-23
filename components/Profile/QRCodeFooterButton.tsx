'use client';

import { useRef } from 'react';
import { QrCode } from 'lucide-react';
import { QRCodeGenerator, type QRCodeGeneratorRef } from './QRCodeGenerator';

interface QRCodeFooterButtonProps {
    name: string;
    slug: string;
    accent: string;
}

export function QRCodeFooterButton({
    name,
    slug,
    accent,
}: QRCodeFooterButtonProps) {
    const qrRef = useRef<QRCodeGeneratorRef>(null);

    return (
        <>
            <button
                onClick={() => qrRef.current?.openModal()}
                className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors inline-flex items-center gap-1"
                title="QR-Code generieren"
            >
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">QR-Code</span>
            </button>
            <QRCodeGenerator
                ref={qrRef}
                name={name}
                slug={slug}
                accent={accent}
            />
        </>
    );
}
