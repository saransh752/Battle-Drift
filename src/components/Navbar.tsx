"use client";

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-500 ${isScrolled ? 'bg-pagani-black/50 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
                }`}
        >
            <div className="text-2xl md:text-3xl font-bold tracking-widest font-orbitron text-white">
                PAGANI
            </div>
            <button className="px-6 py-2 border border-pagani-gold text-pagani-gold hover:bg-pagani-gold hover:text-black transition-all duration-300 uppercase tracking-widest text-xs md:text-sm font-rajdhani font-bold">
                Inquire
            </button>
        </motion.nav>
    );
}
