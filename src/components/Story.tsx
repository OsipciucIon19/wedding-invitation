import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface StoryItem {
    title: string;
    date: string;
    description: string;
    image?: string;
}

interface StoryProps {
    stories: StoryItem[];
}

function StoryCard({ story, index }: { story: StoryItem; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center mb-20`}
        >
            <motion.div
                animate={isInView ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full md:w-1/2"
            >
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <img
                        src={story.image || 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800'}
                        alt={story.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
            </motion.div>

            <div className="w-full md:w-1/2">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="text-wedding-green text-sm font-sans tracking-widest uppercase mb-2">
                        {story.date}
                    </div>
                    <h3 className="font-script text-4xl md:text-5xl text-gray-800 mb-4">
                        {story.title}
                    </h3>
                    <div className="w-16 h-px bg-wedding-green mb-6" />
                    <p className="text-gray-600 leading-relaxed text-lg font-serif">
                        {story.description}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Story({ stories }: StoryProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section id="story" className="py-20 px-4 bg-wedding-cream">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-script text-5xl md:text-6xl text-gray-800 mb-4">
                        Povestea Noastră
                    </h2>
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-px w-20 bg-wedding-green" />
                        <span className="mx-4 text-wedding-green text-2xl">❤</span>
                        <div className="h-px w-20 bg-wedding-green" />
                    </div>
                    <p className="text-gray-600 font-serif text-lg max-w-2xl mx-auto">
                        Fiecare poveste de dragoste este unică și specială. Aceasta este a noastră.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {stories.map((story, index) => (
                        <StoryCard key={index} story={story} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
