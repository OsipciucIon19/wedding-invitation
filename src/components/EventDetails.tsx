import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { PartyPopper, MapPin, Clock } from 'lucide-react';

interface EventDetail {
    type: 'party';
    title: string;
    location: string;
    address: string;
    time: string;
    mapUrl?: string;
}

interface EventDetailsProps {
    party: EventDetail;
}

function EventCard({ event, delay }: { event: EventDetail; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const Icon =  PartyPopper;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden w-full max-w-xl"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-wedding-blush/20 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-wedding-champagne/30 rounded-full -ml-12 -mb-12" />

            <div className="relative z-10">
                <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-6"
                >
                    <div className="w-16 h-16 bg-wedding-green/10 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-wedding-green" />
                    </div>
                </motion.div>

                <h3 className="font-script text-4xl text-gray-800 mb-6">
                    {event.title}
                </h3>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-wedding-green mt-1 flex-shrink-0" />
                        <div>
                            <div className="font-serif text-lg text-gray-800 font-semibold">
                                {event.location}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">
                                {event.address}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-wedding-green flex-shrink-0" />
                        <div className="font-serif text-gray-700">
                            {event.time}
                        </div>
                    </div>
                </div>

                {event.mapUrl && (
                    <motion.a
                        href={event.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 inline-block px-6 py-3 bg-wedding-green/10 hover:bg-wedding-green/20 text-wedding-green rounded-full font-sans text-sm tracking-wider uppercase transition-colors"
                    >
                        Vezi pe Hartă
                    </motion.a>
                )}
            </div>
        </motion.div>
    );
}

export default function EventDetails({ party }: EventDetailsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-wedding-ivory">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-script text-5xl md:text-6xl text-gray-800 mb-4">
                        Detalii Eveniment
                    </h2>
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-px w-20 bg-wedding-green" />
                        <span className="mx-4 text-wedding-green text-2xl">✦</span>
                        <div className="h-px w-20 bg-wedding-green" />
                    </div>
                    <p className="text-gray-600 font-serif text-lg max-w-2xl mx-auto">
                        Vă așteptăm alături de noi în această zi specială
                    </p>
                </motion.div>

                <div className="flex justify-center">
                    {/*<EventCard event={ceremony} delay={0.2} />*/}
                    <EventCard event={party} delay={0.4} />
                </div>
            </div>
        </section>
    );
}
