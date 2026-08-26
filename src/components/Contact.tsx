import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useSanityData } from "../contexts/SanityDataContext";
import { PortableText } from "@portabletext/react";
import { submitContactMessage } from "../services/sanity";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const { contact } = useSanityData();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await submitContactMessage(formData);
      setIsSuccess(true);
      setFormData({ fullName: "", email: "", service: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const label = contact?.label || "";
  const emails: string[] = contact?.emails || [];
  const phones: string[] = contact?.phones || [];
  const locations: any[] = contact?.locations || [];
  const services: string[] = contact?.services || [];

  return (
    <section
      id="contact"
      className="bg-brand-midnight py-32 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">

          {/* Info Column */}
          <motion.div
            className="space-y-12"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <div className="text-[10px] font-technical text-brand-blue uppercase tracking-[0.3em] mb-6 font-bold underline underline-offset-8">
                {label}
              </div>

              {contact?.heading?.content ? (
                <div className="mb-8">
                  <PortableText
                    value={contact.heading.content}
                    components={{
                      block: {
                        normal: ({ children }: any) => (
                          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                            {children}
                          </h2>
                        ),
                      },
                      marks: {
                        gradient: ({ children }: any) => (
                          <span className="text-gradient-brand">{children}</span>
                        ),
                      },
                    }}
                  />
                </div>
              ) : (
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-8">
                  {typeof contact?.heading === "string" ? contact.heading : ""}
                </h2>
              )}

              <p className="text-white/60 text-sm leading-relaxed max-w-md whitespace-pre-line">
                {contact?.description || ""}
              </p>
            </motion.div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 lg:p-10 shadow-2xl"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                  className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Send size={24} />
                </motion.div>
                <h3 className="text-2xl font-serif text-white">Message Received</h3>
                <p className="text-white/60">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-sm text-brand-blue hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-8 text-sm" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-technical text-white/40 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 px-6 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-technical text-white/40 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 px-6 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-technical text-white/40 uppercase tracking-widest ml-1">
                    Service of Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-6 py-3 text-white/60 focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all appearance-none"
                  >
                    <option value="" disabled>Select a service</option>
                    {services.map((service, i) => (
                      <option key={i} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-technical text-white/40 uppercase tracking-widest ml-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full bg-white/5 border border-white/10 px-6 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all resize-none"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                  {!isSubmitting && (
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
