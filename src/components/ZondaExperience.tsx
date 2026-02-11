"use client";

import { motion, MotionValue, useTransform } from 'framer-motion';
import { carData } from '../data/carData';

interface Props {
    scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: Props) {
    // PHASE 1: HERO (0% - 33%)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    // PHASE 2: DESIGN (33% - 66%)
    const designOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]);
    const designY = useTransform(scrollYProgress, [0.3, 0.35, 0.65], [50, 0, -50]);

    // PHASE 3: ENGINE (66% - 100%)
    const engineOpacity = useTransform(scrollYProgress, [0.65, 0.7, 1], [0, 1, 1]);
    const engineX = useTransform(scrollYProgress, [0.65, 0.7], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full max-w-[1400px] mx-auto px-6">

            {/* HERO SECTION */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
                    {carData.name}
                </h1>
                <div className="flex items-center gap-4 text-pagani-gold tracking-widest uppercase font-rajdhani text-lg">
                    <span className="w-12 h-[1px] bg-pagani-gold"></span>
                    <span>{carData.heroTitle}</span>
                    <span className="w-12 h-[1px] bg-pagani-gold"></span>
                </div>
                <p className="mt-4 text-xl md:text-2xl text-white/80 font-rajdhani">{carData.price}</p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-12"
                >
                    <div className="animate-bounce text-white/50 text-xs tracking-widest uppercase">
                        Scroll to Explore
                    </div>
                </motion.div>
            </motion.div>

            {/* DESIGN SECTION */}
            <motion.div
                style={{ opacity: designOpacity, y: designY }}
                className="absolute inset-0 flex flex-col items-start justify-center pl-10 md:pl-20 max-w-2xl"
            >
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-wider relative">
                    Design
                    <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-pagani-gold"></span>
                </h2>
                <h3 className="text-2xl md:text-4xl text-pagani-gold font-rajdhani uppercase mb-4">
                    {carData.design.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 font-rajdhani leading-relaxed max-w-md border-l-2 border-white/20 pl-6">
                    {carData.design.description}
                </p>
            </motion.div>

            {/* ENGINE SECTION */}
            <motion.div
                style={{ opacity: engineOpacity, x: engineX }}
                className="absolute inset-0 flex flex-col items-end justify-center pr-10 md:pr-20"
            >
                <div className="text-right">
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-wider relative">
                        Engine
                        <span className="absolute -bottom-2 right-0 w-1/3 h-1 bg-pagani-gold"></span>
                    </h2>
                    <h3 className="text-2xl md:text-4xl text-pagani-gold font-rajdhani uppercase mb-8">
                        {carData.engine.title}
                    </h3>

                    <div className="space-y-6 font-rajdhani">
                        {Object.entries(carData.engine.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-end items-center gap-4 group">
                                <span className="text-gray-400 uppercase text-sm tracking-widest">{key}</span>
                                <div className="text-2xl md:text-3xl font-bold text-white border-b border-white/10 pb-1 w-48 text-right group-hover:border-pagani-gold transition-colors">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* FIXED PROGRESS INDICATOR */}
            <div className="absolute bottom-10 left-10 md:left-20 flex flex-col gap-2">
                <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
                    <motion.div
                        style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                        className="w-full bg-pagani-gold absolute top-0"
                    />
                </div>
                <span className="text-xs text-pagani-gold -ml-1">01</span>
            </div>

        </div>
    );
}
