import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const hearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
    }));

    return (
        <footer className="relative py-20 px-4 bg-gradient-to-b from-wedding-cream to-wedding-champagne overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ y: '100%', opacity: 0 }}
                        animate={
                            isInView
                                ? {
                                    y: '-100%',
                                    opacity: [0, 1, 1, 0],
                                }
                                : {}
                        }
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="absolute"
                        style={{ left: `${heart.x}%` }}
                    >
                        <Heart className="w-3 h-3 text-wedding-rose/30" fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        className="mb-8"
                    >
                        <Heart className="w-16 h-16 text-wedding-green mx-auto" fill="currentColor" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="font-script text-5xl md:text-6xl text-gray-800 mb-6"
                    >
                        Vă mulțumim!
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-gray-600 font-serif text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
                    >
                        Prezența voastră la această zi specială înseamnă totul pentru noi.
                        Ne bucurăm să împărțim acest moment magic cu cei mai dragi oameni din viața noastră.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-px w-20 bg-wedding-green" />
                            <span className="mx-4 text-wedding-green text-2xl">✦</span>
                            <div className="h-px w-20 bg-wedding-green" />
                        </div>

                        <p className="text-gray-500 font-sans text-sm italic">
                            Cu dragoste și recunoștință
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="mt-16 pt-8 border-t border-wedding-green/20"
                    >
                        <p className="text-gray-400 font-sans text-xs tracking-wider uppercase">
                            {new Date().getFullYear()} - Invitație Digitală de Nuntă
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}
