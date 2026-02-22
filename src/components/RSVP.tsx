import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RSVP() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [formData, setFormData] = useState({
        name: '',
        attending: '',
        numPeople: 1,
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!formData.name || !formData.attending) {
            setError('Te rugăm să completezi toate câmpurile obligatorii');
            setIsSubmitting(false);
            return;
        }

        try {
            const { error: submitError } = await supabase
                .from('rsvp_responses')
                .insert([
                    {
                        name: formData.name,
                        attending: formData.attending === 'yes',
                        num_people: formData.attending === 'yes' ? formData.numPeople : 0,
                        message: formData.message,
                    },
                ]);

            if (submitError) throw submitError;

            setSubmitSuccess(true);
            setFormData({ name: '', attending: '', numPeople: 1, message: '' });

            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);
        } catch (err) {
            setError('A apărut o eroare. Te rugăm să încerci din nou.');
            console.error('Error submitting RSVP:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-white to-wedding-cream">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-script text-5xl md:text-6xl text-gray-800 mb-4">
                        Confirmare Participare
                    </h2>
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-px w-20 bg-wedding-green" />
                        <Heart className="mx-4 text-wedding-green w-6 h-6" fill="currentColor" />
                        <div className="h-px w-20 bg-wedding-green" />
                    </div>
                    <p className="text-gray-600 font-serif text-lg">
                        Vă rugăm să confirmați participarea până la data specificată
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
                >
                    {submitSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                            >
                                <CheckCircle className="w-20 h-20 text-wedding-green mx-auto mb-6" />
                            </motion.div>
                            <h3 className="font-script text-4xl text-gray-800 mb-4">
                                Mulțumim!
                            </h3>
                            <p className="text-gray-600 font-serif text-lg">
                                Am primit confirmarea ta. Ne bucurăm să te avem alături de noi!
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-serif mb-2">
                                    Numele Complet *
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-wedding-green focus:outline-none transition-colors font-sans"
                                    placeholder="Ion Popescu"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-serif mb-3">
                                    Vei participa? *
                                </label>
                                <div className="flex gap-4">
                                    <motion.label
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex-1 cursor-pointer`}
                                    >
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="yes"
                                            checked={formData.attending === 'yes'}
                                            onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`p-4 rounded-lg border-2 text-center font-sans transition-all ${
                                                formData.attending === 'yes'
                                                    ? 'border-wedding-green bg-wedding-green/10 text-wedding-green'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            Da, cu plăcere!
                                        </div>
                                    </motion.label>

                                    <motion.label
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex-1 cursor-pointer`}
                                    >
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="no"
                                            checked={formData.attending === 'no'}
                                            onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`p-4 rounded-lg border-2 text-center font-sans transition-all ${
                                                formData.attending === 'no'
                                                    ? 'border-wedding-green bg-wedding-green/10 text-wedding-green'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            Nu pot participa
                                        </div>
                                    </motion.label>
                                </div>
                            </div>

                            {formData.attending === 'yes' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <label className="block text-gray-700 font-serif mb-2">
                                        Număr de persoane
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.numPeople}
                                        onChange={(e) =>
                                            setFormData({ ...formData, numPeople: parseInt(e.target.value) || 1 })
                                        }
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-wedding-green focus:outline-none transition-colors font-sans"
                                    />
                                </motion.div>
                            )}

                            <div>
                                <label className="block text-gray-700 font-serif mb-2">
                                    Mesaj (opțional)
                                </label>
                                <motion.textarea
                                    whileFocus={{ scale: 1.01 }}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-wedding-green focus:outline-none transition-colors font-sans resize-none"
                                    placeholder="Lasă un mesaj pentru noi..."
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-sans"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-wedding-green hover:bg-wedding-green/90 text-white font-sans tracking-wider uppercase text-sm rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span>Se trimite...</span>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Trimite Confirmarea</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
