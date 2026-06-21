'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import CountUp from 'react-countup';
import { ChevronLeft, ChevronRight, Smile, Award, Maximize, UserCheck, HardHat, ArrowRight, Building2 } from 'lucide-react';

/* ═══════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════ */

const ownerImages = [
  { src: '/images/owner-1.png', alt: 'Company Owner Portrait 1' },
  { src: '/images/owner-2.png', alt: 'Company Owner Portrait 2' },
];

const achievements = [
  { number: 20, suffix: '+', label: 'Happy Clients', icon: Smile },
  { number: 10, suffix: '+', label: 'Years of Experience', icon: Award },
  { number: 500000, suffix: '+', label: 'Square Feet Constructed', icon: Maximize },
  { number: 5, suffix: '+', label: 'Qualified Chief Engineers', icon: UserCheck },
  { number: 200, suffix: '+', label: 'Skilled Workers', icon: HardHat },
];

const projects = [
  {
    title: 'Layout Development',
    image: '/images/large-building.png',
    desc: 'Comprehensive layout planning and infrastructure development designed to create organized and sustainable communities.',
  },
  {
    title: 'Godown Construction',
    image: '/images/construction-site.png',
    desc: 'Durable and efficient warehouse solutions designed to meet industrial and storage requirements.',
  },
  {
    title: 'Building Construction',
    image: '/images/hero-bg.png',
    desc: 'High-quality residential and commercial construction projects delivered with precision and engineering excellence.',
  },
];

/* ═══════════════════════════════════════════════════
   Fade variants
   ═══════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

/* ═══════════════════════════════════════════════════
   Owner Image Carousel (crossfade)
   ═══════════════════════════════════════════════════ */

function OwnerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ownerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
      {ownerImages.map((img, i) => (
        <motion.div
          key={i}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </motion.div>
      ))}
      {/* Gold border accent */}
      <div className="absolute inset-0 rounded-2xl border border-gold/20 pointer-events-none" />
      {/* Navigation arrows inside carousel */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + ownerImages.length) % ownerImages.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-navy hover:text-gold transition-colors z-10 cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % ownerImages.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-navy hover:text-gold transition-colors z-10 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bottom shadow/gradient for image text visibility if needed */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent rounded-b-2xl" />
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {ownerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'bg-gold w-6' : 'bg-ivory/30'
            }`}
            aria-label={`Show owner image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Achievements Carousel (Embla)
   ═══════════════════════════════════════════════════ */

function AchievementsCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div ref={ref} className="relative">
      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center text-navy hover:text-blue hover:scale-105 transition-all cursor-pointer"
        aria-label="Previous achievement"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center text-navy hover:text-blue hover:scale-105 transition-all cursor-pointer"
        aria-label="Next achievement"
      >
        <ChevronRight size={24} />
      </button>

      <div className="embla px-2" ref={emblaRef}>
        <div className="embla__container gap-6">
          {achievements.map((item, i) => (
            <div
              key={i}
              className="embla__slide w-full sm:w-1/2 lg:w-1/3 flex-shrink-0"
            >
              <div className="card-premium h-full group">
                {/* Icon */}
                <div className="flex justify-center pt-12 pb-6">
                  <div className="text-gold">
                    <item.icon size={56} strokeWidth={1.5} />
                  </div>
                </div>
                {/* Text */}
                <div className="p-6 pt-0 text-center">
                  <p className="text-4xl sm:text-5xl font-heading font-bold text-navy">
                    {isInView ? (
                      <CountUp
                        end={item.number}
                        duration={2.5}
                        separator=","
                        suffix={item.suffix}
                      />
                    ) : (
                      `0${item.suffix}`
                    )}
                  </p>
                  <p className="mt-3 text-sm font-medium text-dark-gray/70 uppercase tracking-wider">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Project Cards
   ═══════════════════════════════════════════════════ */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="card-premium overflow-hidden group"
    >
      {/* Image */}
      <div className="img-zoom h-56 relative rounded-t-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      {/* Description */}
      <div className="p-6 lg:p-8 bg-white relative">
        {/* Navy circular icon overlapping */}
        <div className="absolute -top-8 left-6 w-16 h-16 bg-navy rounded-full border-[6px] border-white flex items-center justify-center text-gold">
          <Building2 size={24} />
        </div>
        <h4 className="font-heading text-xl font-bold text-navy mt-4 mb-3">{project.title}</h4>
        <p className="text-sm text-dark-gray/80 leading-relaxed">{project.desc}</p>
        <div className="mt-6 flex justify-end">
          <ArrowRight className="text-gold group-hover:translate-x-1 transition-transform" size={24} />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Main About Section
   ═══════════════════════════════════════════════════ */

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-20 bg-white border-b border-black/10">
      <div className="container-custom">
        {/* ─── Row 1: Who We Are ─── */}
        <div className="mb-24 md:mb-32">
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <p className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">
              ABOUT US
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Building Excellence for Over{' '}
              <span className="text-gold">Two Decades</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Owner images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <OwnerCarousel />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="mt-6 space-y-5 text-dark-gray text-[1rem] leading-relaxed">
              <p>
                Sri Venkateshwara Infra Tech has been building and transforming
                lives for more than 20 years. With extensive experience in
                construction and infrastructure development, we have
                successfully delivered projects that stand as symbols of
                quality, trust, and innovation.
              </p>
              <p>
                Our team comprises highly skilled engineers, experienced
                professionals, and dedicated craftsmen who work together to
                transform ideas into reality. We believe that every project is
                more than a structure—it is a foundation for families,
                businesses, and communities to grow and prosper.
              </p>
              <p>
                Through commitment, technical expertise, and attention to
                detail, we continue to build spaces that inspire confidence and
                create lasting value.
              </p>
            </div>
          </motion.div>
        </div>
        </div>

        {/* ─── Row 2: Achievements ─── */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">
              OUR ACHIEVEMENTS
            </p>
            <h3 className="text-3xl sm:text-4xl text-navy font-bold font-heading">
              Building Trust Through Numbers
            </h3>
          </motion.div>
          <AchievementsCarousel />
        </div>

        {/* ─── Row 3: Recent Projects ─── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">
              RECENT PROJECTS
            </p>
            <h3 className="text-3xl sm:text-4xl text-navy font-bold font-heading">
              Our Recent Work
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
