'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/large-building.png"
          alt="Construction site at golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        />
        {/* Bottom gradient fade to light background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />
      <div className="absolute top-1/3 right-10 w-px h-40 bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        {/* Gold decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mb-8 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        {/* 3-Line Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-white"
          >
            Building Excellence,
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-gold mt-2"
          >
            Creating Foundations
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-white mt-2"
          >
            for Generations.
          </motion.div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-medium"
        >
          With over two decades of experience in construction and infrastructure,
          we build not just structures, but stronger lives and a better tomorrow.
        </motion.p>

        {/* CTA Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-32 flex flex-col items-center gap-6"
        >
          <button
            onClick={() =>
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-navy hover:bg-blue text-gold text-sm font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5 tracking-wider"
          >
            EXPLORE MORE
          </button>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-navy"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
