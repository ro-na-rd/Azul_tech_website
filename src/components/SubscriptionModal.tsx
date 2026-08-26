import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle2, ShieldCheck, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export default function SubscriptionModal({ isOpen, onClose, defaultEmail = '' }: SubscriptionModalProps) {
  const [step, setStep] = useState<'plan' | 'payment' | 'success'>('plan');
  const [plan, setPlan] = useState<'free' | 'pro'>('pro');
  const [email, setEmail] = useState(defaultEmail);
  
  // Card details state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value).slice(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^0-9]/g, '');
    if (v.length >= 2) {
      v = v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    setExpiry(v.slice(0, 5));
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1200);
  };

  const resetModal = () => {
    setStep('plan');
    setIsProcessing(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-[#061521] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-10 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#040D14]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-blue" size={24} />
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">Azul Tech Subscriptions</h3>
                  <p className="text-[10px] font-technical text-white/50 uppercase tracking-widest">Sovereign DPI Dispatches</p>
                </div>
              </div>
              <button
                onClick={resetModal}
                className="text-white/50 hover:text-white transition-colors p-1"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8">
              {/* STEP 1: SELECT PLAN */}
              {step === 'plan' && (
                <div>
                  <h4 className="text-xl font-serif font-bold text-white mb-2">Choose Your Subscription Tier</h4>
                  <p className="text-xs text-white/60 mb-6">Select access level for technical specifications & institutional briefs.</p>

                  <div className="space-y-4 mb-8">
                    {/* Free Tier */}
                    <div
                      onClick={() => setPlan('free')}
                      className={`p-5 border rounded-lg cursor-pointer transition-all flex justify-between items-center ${
                        plan === 'free' ? 'border-brand-blue bg-brand-blue/10' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold font-serif text-white">Executive Public Briefings</span>
                          <span className="text-[9px] font-technical bg-white/10 px-2 py-0.5 rounded text-white/70 uppercase">Free</span>
                        </div>
                        <p className="text-xs text-white/50 mt-1">Monthly public infrastructure dispatches & policy summaries.</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-white">$0</span>
                        <span className="text-xs text-white/40 block">/ forever</span>
                      </div>
                    </div>

                    {/* Pro / Payment Tier */}
                    <div
                      onClick={() => setPlan('pro')}
                      className={`p-5 border rounded-lg cursor-pointer transition-all flex justify-between items-center relative overflow-hidden ${
                        plan === 'pro' ? 'border-brand-blue bg-brand-blue/15' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="absolute top-0 right-0 bg-brand-blue text-brand-midnight text-[9px] font-bold px-3 py-1 uppercase tracking-widest font-technical rounded-bl">
                        Recommended
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold font-serif text-white">Institutional Pass & Code Audits</span>
                          <Sparkles size={14} className="text-brand-blue" />
                        </div>
                        <p className="text-xs text-white/60 mt-1">Full reference implementation codebases, 5-layer specs & priority advisory.</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-white">$499</span>
                        <span className="text-xs text-white/40 block">/ year</span>
                      </div>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="mb-6">
                    <label className="block text-xs font-technical text-white/70 uppercase tracking-widest mb-2 font-bold">Subscriber Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.gov"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!email) return;
                      if (plan === 'free') {
                        setStep('success');
                      } else {
                        setStep('payment');
                      }
                    }}
                    disabled={!email}
                    className="w-full bg-brand-blue text-brand-midnight font-bold py-3.5 rounded text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{plan === 'free' ? 'Activate Free Subscription' : 'Proceed to Payment Card'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* STEP 2: PAYMENT CARD DETAILS */}
              {step === 'payment' && (
                <form onSubmit={handleSubmitPayment}>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-white">Payment Card Details</h4>
                      <p className="text-xs text-white/60">Institutional Pass — $499.00 USD / year</p>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Lock size={14} className="text-brand-blue" />
                      <span>256-Bit Encrypted</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-[10px] font-technical text-white/70 uppercase tracking-widest mb-1.5 font-bold">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Minister or Director Name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-technical text-white/70 uppercase tracking-widest mb-1.5 font-bold flex justify-between">
                        <span>Card Number</span>
                        <div className="flex items-center gap-1.5 text-white/40">
                          <CreditCard size={14} />
                          <span>Visa / Mastercard / AMEX</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="4532 •••• •••• 8912"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-technical text-white/70 uppercase tracking-widest mb-1.5 font-bold">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={handleExpiryChange}
                          className="w-full bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-technical text-white/70 uppercase tracking-widest mb-1.5 font-bold">CVC / Security Code</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="•••"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('plan')}
                      className="w-1/3 bg-white/10 text-white font-bold py-3.5 rounded text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-2/3 bg-brand-blue text-brand-midnight font-bold py-3.5 rounded text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Processing Payment...</span>
                      ) : (
                        <>
                          <CreditCard size={16} />
                          <span>Pay $499.00 & Subscribe</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: SUCCESS CONFIRMATION PASS */}
              {step === 'success' && (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 bg-brand-blue/20 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-blue/40"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>

                  <h4 className="text-2xl font-serif font-bold text-white mb-2">Subscription Active!</h4>
                  <p className="text-xs text-white/60 mb-8">
                    Welcome to Azul Tech Dispatches. Confirmation & institutional access key sent to{' '}
                    <span className="text-brand-blue font-bold">{email}</span>.
                  </p>

                  {/* Digital Membership Card Artifact */}
                  <div className="bg-gradient-to-br from-[#061A2A] to-[#040D14] border border-brand-blue/30 rounded-xl p-6 mb-8 text-left relative overflow-hidden shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[9px] font-technical text-brand-blue uppercase tracking-widest font-bold">AZUL TECH MEMBER PASS</p>
                        <p className="text-sm font-serif font-bold text-white mt-1">
                          {plan === 'pro' ? 'Institutional Infrastructure Pass' : 'Executive Public Briefing'}
                        </p>
                      </div>
                      <span className="text-[10px] font-technical bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded font-bold uppercase tracking-widest">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/70 pt-4 border-t border-white/10">
                      <div>
                        <span className="text-[9px] text-white/40 block uppercase">Subscriber</span>
                        <span className="text-white truncate block">{email}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 block uppercase">Pass Key</span>
                        <span className="text-brand-blue block">AZUL-DPI-8921-X</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetModal}
                    className="w-full bg-brand-blue text-brand-midnight font-bold py-3.5 rounded text-xs uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Done & Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
