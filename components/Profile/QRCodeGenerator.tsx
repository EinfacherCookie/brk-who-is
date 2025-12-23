'use client';

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, X, Moon, Sun } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
    name: string;
    slug: string;
    accent: string;
}

export interface QRCodeGeneratorRef {
    openModal: () => void;
}

type DesignTheme = 'light' | 'dark';

export const QRCodeGenerator = forwardRef<
    QRCodeGeneratorRef,
    QRCodeGeneratorProps
>(function QRCodeGenerator({ name, slug, accent }, ref) {
    const [showQR, setShowQR] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [designTheme, setDesignTheme] = useState<DesignTheme>('light');
    const simpleQrRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
        openModal: () => setShowQR(true),
    }));

    const profileUrl = `${
        typeof window !== 'undefined' ? window.location.origin : ''
    }/moritz-lausch`;

    const downloadSimpleQRCode = () => {
        const canvas = simpleQrRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${slug}-qrcode.png`;
            link.click();
        }
    };

    const downloadDesignQRCode = async () => {
        setDownloading(true);
        try {
            // Farben basierend auf Theme
            const bgColor = designTheme === 'light' ? '#ffffff' : '#1a1a1a';
            const fgColor = designTheme === 'light' ? '#000000' : '#ffffff';

            // Generiere QR-Code mit qrcode library
            const qrCanvas = document.createElement('canvas');
            await QRCode.toCanvas(qrCanvas, profileUrl, {
                width: 200,
                color: {
                    dark: fgColor,
                    light: bgColor,
                },
            });

            // Erstelle das finale Design Canvas
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = 350;
            finalCanvas.height = 500;
            const ctx = finalCanvas.getContext('2d')!;

            // Hintergrund
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

            // Logo Kreis
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.arc(175, 50, 32, 0, Math.PI * 2);
            ctx.fill();

            // BRK Text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('BRK', 175, 50);

            // QR-Code zeichnen (mit Padding/Border in entsprechender Farbe)
            ctx.fillStyle = bgColor;
            ctx.fillRect(65, 100, 220, 220);
            ctx.drawImage(qrCanvas, 75, 110, 200, 200);

            // Name
            ctx.fillStyle = accent;
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(name, 175, 340);

            // Untertitel
            ctx.fillStyle = designTheme === 'light' ? '#666666' : '#999999';
            ctx.font = '12px Arial';
            ctx.fillText('BRK KV Nürnberg-Stadt', 175, 365);

            // Download
            const link = document.createElement('a');
            link.href = finalCanvas.toDataURL('image/png');
            link.download = `${slug}-qrcode-design-${designTheme}.png`;
            link.click();
        } catch (error) {
            console.error('Fehler beim Download:', error);
            alert('Fehler beim Download. Bitte versuchen Sie es erneut.');
        }
        setDownloading(false);
    };

    if (showQR) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-md w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                            QR-Code für {name}
                        </h2>
                        <button
                            onClick={() => setShowQR(false)}
                            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="mb-8 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-3">
                            {profileUrl}
                        </p>
                    </div>

                    <div className="space-y-3 mb-4">
                        <Button
                            onClick={downloadSimpleQRCode}
                            className="w-full h-12 text-sm font-semibold flex items-center justify-center gap-2 rounded-xl"
                            style={{ backgroundColor: accent }}
                        >
                            <Download className="w-4 h-4" />
                            OHNE Design
                        </Button>

                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setDesignTheme('light')}
                                    variant={
                                        designTheme === 'light'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="flex-1 h-10 text-xs gap-1.5 rounded-lg flex items-center justify-center"
                                    style={
                                        designTheme === 'light'
                                            ? { backgroundColor: accent }
                                            : {}
                                    }
                                >
                                    <Sun className="w-4 h-4" />
                                    Light
                                </Button>
                                <Button
                                    onClick={() => setDesignTheme('dark')}
                                    variant={
                                        designTheme === 'dark'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="flex-1 h-10 text-xs gap-1.5 rounded-lg flex items-center justify-center"
                                    style={
                                        designTheme === 'dark'
                                            ? { backgroundColor: accent }
                                            : {}
                                    }
                                >
                                    <Moon className="w-4 h-4" />
                                    Dark
                                </Button>
                            </div>

                            <Button
                                onClick={downloadDesignQRCode}
                                disabled={downloading}
                                className="w-full h-12 text-sm font-semibold flex items-center justify-center gap-2 rounded-xl"
                                style={{ backgroundColor: accent }}
                            >
                                <Download className="w-4 h-4" />
                                {downloading
                                    ? 'Wird generiert...'
                                    : 'MIT Design'}
                            </Button>
                        </div>
                    </div>

                    <Button
                        onClick={() => setShowQR(false)}
                        variant="outline"
                        className="w-full"
                    >
                        Schließen
                    </Button>

                    {/* Hidden elements for rendering */}
                    <div style={{ display: 'none' }}>
                        <QRCodeCanvas
                            ref={simpleQrRef}
                            value={profileUrl}
                            size={256}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Button
            onClick={() => setShowQR(true)}
            className="w-full hidden h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl"
            style={{
                backgroundColor: accent,
                borderColor: accent,
            }}
        >
            QR-Code generieren
        </Button>
    );
});
