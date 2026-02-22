import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroImage from '../assets/hero1.jpg';

interface HeroProps {
    backgroundImage?: string;
    brideName: string;
    groomName: string;
    weddingDate: string;
}

export default function Hero({
                                 backgroundImage = heroImage,
                                 brideName,
                                 groomName,
                                 weddingDate,
                             }: HeroProps) {
    const scrollToInvitation = () => {
        const storySection = document.getElementById('story');
        storySection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute inset-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
            </motion.div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mb-8"
                >
                    <div className="mb-4 text-wedding-green-light text-sm tracking-[0.3em] uppercase font-sans">
                        Ne Căsătorim
                    </div>
                    <h1 className="font-script text-6xl md:text-8xl text-white mb-4 leading-tight">
                        {brideName}
                    </h1>
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-px w-12 bg-wedding-green" />
                        <span className="mx-4 text-wedding-green text-3xl font-serif">&</span>
                        <div className="h-px w-12 bg-wedding-green" />
                    </div>
                    <h1 className="font-script text-6xl md:text-8xl text-white leading-tight">
                        {groomName}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mb-12"
                >
                    <p className="text-wedding-cream text-xl md:text-2xl font-serif tracking-wide">
                        {weddingDate}
                    </p>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToInvitation}
                    className="px-8 py-4 bg-wedding-green/90 hover:bg-wedding-green text-white font-sans tracking-wider uppercase text-sm rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    Vezi Invitația
                </motion.button>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="w-8 h-8 text-wedding-green-light" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
