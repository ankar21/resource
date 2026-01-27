"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Actual frame filenames from the directory
const FRAME_FILES = [
    "frame_000_delay-0.042s.jpg", "frame_001_delay-0.041s.jpg", "frame_002_delay-0.042s.jpg",
    "frame_003_delay-0.042s.jpg", "frame_004_delay-0.041s.jpg", "frame_005_delay-0.042s.jpg",
    "frame_006_delay-0.042s.jpg", "frame_007_delay-0.041s.jpg", "frame_008_delay-0.042s.jpg",
    "frame_009_delay-0.042s.jpg", "frame_010_delay-0.041s.jpg", "frame_011_delay-0.042s.jpg",
    "frame_012_delay-0.042s.jpg", "frame_013_delay-0.041s.jpg", "frame_014_delay-0.042s.jpg",
    "frame_015_delay-0.042s.jpg", "frame_016_delay-0.041s.jpg", "frame_017_delay-0.042s.jpg",
    "frame_018_delay-0.042s.jpg", "frame_019_delay-0.041s.jpg", "frame_020_delay-0.042s.jpg",
    "frame_021_delay-0.042s.jpg", "frame_022_delay-0.041s.jpg", "frame_023_delay-0.042s.jpg",
    "frame_024_delay-0.042s.jpg", "frame_025_delay-0.041s.jpg", "frame_026_delay-0.042s.jpg",
    "frame_027_delay-0.042s.jpg", "frame_028_delay-0.041s.jpg", "frame_029_delay-0.042s.jpg",
    "frame_030_delay-0.042s.jpg", "frame_031_delay-0.041s.jpg", "frame_032_delay-0.042s.jpg",
    "frame_033_delay-0.042s.jpg", "frame_034_delay-0.041s.jpg", "frame_035_delay-0.042s.jpg",
    "frame_036_delay-0.042s.jpg", "frame_037_delay-0.041s.jpg", "frame_038_delay-0.042s.jpg",
    "frame_039_delay-0.042s.jpg", "frame_040_delay-0.041s.jpg", "frame_041_delay-0.042s.jpg",
    "frame_042_delay-0.042s.jpg", "frame_043_delay-0.041s.jpg", "frame_044_delay-0.042s.jpg",
    "frame_045_delay-0.042s.jpg", "frame_046_delay-0.041s.jpg", "frame_047_delay-0.042s.jpg",
    "frame_048_delay-0.042s.jpg", "frame_049_delay-0.041s.jpg", "frame_050_delay-0.042s.jpg",
    "frame_051_delay-0.042s.jpg", "frame_052_delay-0.041s.jpg", "frame_053_delay-0.042s.jpg",
    "frame_054_delay-0.042s.jpg", "frame_055_delay-0.041s.jpg", "frame_056_delay-0.042s.jpg",
    "frame_057_delay-0.042s.jpg", "frame_058_delay-0.041s.jpg", "frame_059_delay-0.042s.jpg",
    "frame_060_delay-0.042s.jpg", "frame_061_delay-0.041s.jpg", "frame_062_delay-0.042s.jpg",
    "frame_063_delay-0.042s.jpg", "frame_064_delay-0.041s.jpg", "frame_065_delay-0.042s.jpg",
    "frame_066_delay-0.042s.jpg", "frame_067_delay-0.041s.jpg", "frame_068_delay-0.042s.jpg",
    "frame_069_delay-0.042s.jpg", "frame_070_delay-0.041s.jpg", "frame_071_delay-0.042s.jpg",
    "frame_072_delay-0.042s.jpg", "frame_073_delay-0.041s.jpg", "frame_074_delay-0.042s.jpg",
    "frame_075_delay-0.042s.jpg", "frame_076_delay-0.041s.jpg", "frame_077_delay-0.042s.jpg",
    "frame_078_delay-0.042s.jpg", "frame_079_delay-0.041s.jpg", "frame_080_delay-0.042s.jpg",
    "frame_081_delay-0.042s.jpg", "frame_082_delay-0.041s.jpg", "frame_083_delay-0.042s.jpg",
    "frame_084_delay-0.042s.jpg", "frame_085_delay-0.041s.jpg", "frame_086_delay-0.042s.jpg",
    "frame_087_delay-0.042s.jpg", "frame_088_delay-0.041s.jpg", "frame_089_delay-0.042s.jpg",
    "frame_090_delay-0.042s.jpg", "frame_091_delay-0.041s.jpg", "frame_092_delay-0.042s.jpg",
    "frame_093_delay-0.042s.jpg", "frame_094_delay-0.041s.jpg", "frame_095_delay-0.042s.jpg",
    "frame_096_delay-0.042s.jpg", "frame_097_delay-0.041s.jpg", "frame_098_delay-0.042s.jpg",
    "frame_099_delay-0.042s.jpg", "frame_100_delay-0.041s.jpg", "frame_101_delay-0.042s.jpg",
    "frame_102_delay-0.042s.jpg", "frame_103_delay-0.041s.jpg", "frame_104_delay-0.042s.jpg",
    "frame_105_delay-0.042s.jpg", "frame_106_delay-0.041s.jpg", "frame_107_delay-0.042s.jpg",
    "frame_108_delay-0.042s.jpg", "frame_109_delay-0.041s.jpg", "frame_110_delay-0.042s.jpg",
    "frame_111_delay-0.042s.jpg", "frame_112_delay-0.041s.jpg", "frame_113_delay-0.042s.jpg",
    "frame_114_delay-0.042s.jpg", "frame_115_delay-0.041s.jpg", "frame_116_delay-0.042s.jpg",
    "frame_117_delay-0.042s.jpg", "frame_118_delay-0.041s.jpg", "frame_119_delay-0.042s.jpg",
    "frame_120_delay-0.042s.jpg", "frame_121_delay-0.042s.jpg"
];

const TOTAL_FRAMES = FRAME_FILES.length;

// Scroll-triggered call-to-action messages
const CTA_MESSAGES = [
    { threshold: 0.15, text: "Upload je materiaalstaat" },
    { threshold: 0.35, text: "We matchen met circulaire voorraad" },
    { threshold: 0.55, text: "Ontvang direct een match-rapport" },
    { threshold: 0.75, text: "Klaar voor je MPG-dossier" },
];

interface HeroScrollProps {
    children?: React.ReactNode;
    className?: string;
}

export function HeroScroll({ children, className }: HeroScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Transform scroll progress to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    // Opacity for the overlay content - fade out as we scroll
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 1], [1, 1, 0, 0]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises = [];

            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `/hero-frames/${FRAME_FILES[i]}`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Failed to load frame ${i}: ${FRAME_FILES[i]}`);
                        resolve();
                    };
                });
                imagePromises.push(promise);
            }

            await Promise.all(imagePromises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Track scroll progress for CTA messages
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (value) => {
            let newIndex = -1;
            for (let i = CTA_MESSAGES.length - 1; i >= 0; i--) {
                if (value >= CTA_MESSAGES[i].threshold) {
                    newIndex = i;
                    break;
                }
            }
            setCurrentMessageIndex(newIndex);
        });
        return unsubscribe;
    }, [scrollYProgress]);

    useEffect(() => {
        let animationId: number;

        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas || !isLoaded || images.length === 0) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            let currentIndex = Math.floor(frameIndex.get());
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex >= TOTAL_FRAMES) currentIndex = TOTAL_FRAMES - 1;

            const img = images[currentIndex];
            if (img) {
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasRatio > imgRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * imgRatio;
                    drawHeight = canvas.height;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }

            animationId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            if (canvasRef.current) {
                // Use device pixel ratio for better quality
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                canvasRef.current.style.width = `${window.innerWidth}px`;
                canvasRef.current.style.height = `${window.innerHeight}px`;
                const ctx = canvasRef.current.getContext("2d");
                if (ctx) ctx.scale(dpr, dpr);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        animationId = requestAnimationFrame(render);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, [isLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className={cn("h-[300vh] relative", className)}>
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Initial content - fades out on scroll */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute z-10 container flex flex-col items-center justify-center text-center text-white"
                >
                    {children}
                </motion.div>

                {/* Scroll-triggered CTA messages - centered in viewport */}
                <div className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none">
                    <AnimatePresence mode="wait">
                        {currentMessageIndex >= 0 && (
                            <motion.div
                                key={currentMessageIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center px-6 max-w-4xl drop-shadow-lg"
                            >
                                {CTA_MESSAGES[currentMessageIndex].text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!isLoaded && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono animate-pulse z-30">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
}
