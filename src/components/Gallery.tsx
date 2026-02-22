import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

interface GalleryProps {
    images: string[];
}

export default function Gallery({ images }: GalleryProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <section className="py-20 px-4 bg-wedding-cream">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-script text-5xl md:text-6xl text-gray-800 mb-4">
                            Galerie Foto
                        </h2>
                        <div className="flex items-center justify-center mb-4">
                            <div className="h-px w-20 bg-wedding-green" />
                            <span className="mx-4 text-wedding-green text-2xl">✦</span>
                            <div className="h-px w-20 bg-wedding-green" />
                        </div>
                        <p className="text-gray-600 font-serif text-lg">
                            Momente prețioase capturate în timp
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-square"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-wedding-green/20 flex items-center justify-center"
                                >
                  <span className="text-white text-sm font-sans tracking-wider uppercase">
                    Vezi
                  </span>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            src={selectedImage}
                            alt="Selected"
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
