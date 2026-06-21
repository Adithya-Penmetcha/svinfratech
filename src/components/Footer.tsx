'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-8 bg-navy border-t border-gold/30">
      <div className="container-custom flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-white/50 text-center"
        >
          © 2025 Sri Venkateshwara Infra Tech. All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
}
