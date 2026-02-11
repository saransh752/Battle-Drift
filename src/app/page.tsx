"use client";

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ZondaScrollCanvas from '@/components/ZondaScrollCanvas';
import ZondaExperience from '@/components/ZondaExperience';

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-pagani-black min-h-screen text-white selection:bg-pagani-gold selection:text-black">
      <Navbar />

      {/* SCROLL SEQUENCE (Locked for 600vh as requested) */}
      <section ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ZondaScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={128}
            imageFolderPath="/images/zonda-sequence/frames"
          />
          <ZondaExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* REST OF SITE (Scrolls naturally after sequence) */}
      <div className="relative z-20 bg-pagani-black border-t border-white/10">

        {/* Specs Grid Placeholder */}
        <section className="container mx-auto px-6 py-24">
          <h2 className="text-4xl md:text-6xl font-orbitron uppercase mb-16 text-center text-white/90">
            Technical Mastery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Monocoque", desc: "Carbo-Titanium HP52", value: "1070kg" },
              { title: "Power", desc: "Mercedes-Benz AMG V12", value: "750HP" },
              { title: "Performance", desc: "0-100 km/h", value: "2.7s" },
              { title: "Transmission", desc: "Xtrac Magnesium", value: "6-Speed" },
              { title: "Aerodynamics", desc: "Downforce at 286km/h", value: "1500kg" },
              { title: "Exhaust", desc: "Inconel 625/Ceramic", value: "Hydroformed" }
            ].map((item, i) => (
              <div key={i} className="bg-pagani-black p-10 hover:bg-white/5 transition-colors group">
                <h3 className="text-sm font-rajdhani text-pagani-gold uppercase tracking-widest mb-2">{item.title}</h3>
                <div className="text-3xl font-orbitron text-white mb-2">{item.value}</div>
                <p className="text-gray-500 font-rajdhani">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Create Features Placeholder */}
        <section className="py-24 bg-carbon-gray relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-orbitron uppercase mb-6">Art on the Track</h2>
                <p className="text-lg text-gray-300 font-rajdhani leading-relaxed mb-8">
                  The Zonda R is the ultimate expression of freedom. Bound by no rules, except for those of physics and aerodynamics. It is not just a car, but a rolling sculpture destined for the most prestigious circuits in the world.
                </p>
                <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm font-rajdhani font-bold">
                  View Gallery
                </button>
              </div>
              <div className="md:w-1/2 h-64 md:h-96 bg-black/50 w-full border border-white/10 flex items-center justify-center text-white/20 font-orbitron text-2xl uppercase tracking-widest">
                [Feature Image]
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-12 bg-black text-center text-gray-500 font-rajdhani text-sm uppercase tracking-wider">
          <div className="mb-6 flex justify-center gap-8 text-white/40">
            <a href="#" className="hover:text-pagani-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-pagani-gold transition-colors">Twitter</a>
            <a href="#" className="hover:text-pagani-gold transition-colors">Youtube</a>
          </div>
          <p>&copy; {new Date().getFullYear()} PAGANI AUTOMOBILI. TRIBUTE PROJECT.</p>
        </footer>
      </div>
    </main>
  );
}
