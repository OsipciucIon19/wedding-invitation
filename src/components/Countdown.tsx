import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface CountdownProps {
    weddingDate: Date;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function CountdownBox({ value, label, delay }: { value: number; label: string; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col items-center"
        >
            <motion.div
                key={value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-3 min-w-[100px] md:min-w-[120px]"
            >
                <div className="font-serif text-4xl md:text-6xl font-bold text-wedding-green text-center">
                    {String(value).padStart(2, '0')}
                </div>
            </motion.div>
            <div className="text-gray-600 font-sans text-sm md:text-base tracking-wider uppercase">
                {label}
            </div>
        </motion.div>
    );
}

export default function Countdown({ weddingDate }: CountdownProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const wedding = weddingDate.getTime();
            const difference = wedding - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [weddingDate]);

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-wedding-ivory to-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-40 h-40 bg-wedding-green rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-wedding-rose rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-script text-5xl md:text-6xl text-gray-800 mb-4">
                        Numărătoarea Inversă
                    </h2>
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-px w-20 bg-wedding-green" />
                        <span className="mx-4 text-wedding-green text-2xl">♥</span>
                        <div className="h-px w-20 bg-wedding-green" />
                    </div>
                    <p className="text-gray-600 font-serif text-lg">
                        Timpul rămas până la cel mai frumos moment
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <CountdownBox value={timeLeft.days} label="Zile" delay={0.2} />
                    <CountdownBox value={timeLeft.hours} label="Ore" delay={0.3} />
                    <CountdownBox value={timeLeft.minutes} label="minute" delay={0.4} />
                    <CountdownBox value={timeLeft.seconds} label="secunde" delay={0.5} />
                </div>
            </div>
        </section>
    );
}
