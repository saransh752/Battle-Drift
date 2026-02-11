"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

interface ZondaScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function ZondaScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: ZondaScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        // Frames are 0-indexed (0 to 127) based on user files
        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            // Construct filename: 0.gif, 1.gif, etc.
            img.src = `${imageFolderPath}/${i}.gif`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            imgArray.push(img);
        }
        setImages(imgArray);
    }, [totalFrames, imageFolderPath]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const img = images[index];

        if (!ctx || !img) return;

        // Check if context tracking vars match current sizing, if not, wait for resize handler
        // Actually, we can just rely on the existing context state if we manage it correctly in handleResize

        // We'll calculate drawing params based on the CURRENT canvas logical size
        const dpr = window.devicePixelRatio || 1;
        const logicalWidth = canvas.width / dpr;
        const logicalHeight = canvas.height / dpr;

        const imgRatio = img.width / img.height;
        const canvasRatio = logicalWidth / logicalHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawHeight = logicalHeight;
            drawWidth = drawHeight * imgRatio;
            offsetX = (logicalWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = logicalWidth;
            drawHeight = drawWidth / imgRatio;
            offsetX = 0;
            offsetY = (logicalHeight - drawHeight) / 2;
        }

        // Clear and draw
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, [images]);

    // Handle Resize used to set canvas size
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);

            // Re-render current frame after resize
            if (isLoaded && images.length > 0) {
                const frameIndex = Math.min(
                    Math.max(Math.floor(scrollYProgress.get() * (totalFrames - 1)), 0),
                    totalFrames - 1
                );
                renderFrame(frameIndex);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Init size

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images, renderFrame, scrollYProgress, totalFrames]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            Math.max(Math.floor(latest * (totalFrames - 1)), 0),
            totalFrames - 1
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-contain bg-pagani-black"
        />
    );
}
