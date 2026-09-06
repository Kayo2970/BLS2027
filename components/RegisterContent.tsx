
import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { REGISTRATION_CATEGORIES, PASS_TIERS, PAYMENT_PORTAL_URL, GOOGLE_SCRIPT_URL } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Loader2, Star, X } from 'lucide-react';

const RegisterContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPass, setSelectedPass] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSelectedPass(null); // Reset pass if category changes
    // Smooth scroll to pass selection
    setTimeout(() => {
        document.getElementById('pass-selection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePassSelect = (id: string) => {
    setSelectedPass(id);
    // Smooth scroll to form
    setTimeout(() => {
        document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedPass) return;

    processSubmission();
  };

  const processSubmission = async () => {
    setIsSubmitting(true);
    const categoryName = REGISTRATION_CATEGORIES.find(c => c.id === selectedCategory)?.title;
    const passName = PASS_TIERS.find(p => p.id === selectedPass)?.name;
    const passPrice = PASS_TIERS.find(p => p.id === selectedPass)?.price;

    try {
        // 1. Send to Google Sheets (if configured)
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ 
                    ...formData, 
                    category: categoryName, 
                    pass: passName, 
                    price: passPrice,
                    subject: 'Delegate Registration'
                }),
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. Redirect to Payment Portal
        window.location.href = PAYMENT_PORTAL_URL;

        // Reset
        setFormData({ name: '', email: '', phone: '', organization: '' });
        setSelectedCategory(null);
        setSelectedPass(null);
    } catch (error) {
        console.error("Submission error", error);
        // Fallback redirect
        window.location.href = PAYMENT_PORTAL_URL;
    } finally {
        setIsSubmitting(false);
    }
  };

  // Filter passes based on selected category
  const filteredPasses = PASS_TIERS.filter(pass => {
      if (selectedCategory === 'student') return true; // All passes
      if (selectedCategory === 'academic') return ['gold', 'platinum'].includes(pass.id);
      if (selectedCategory === 'industry') return ['platinum'].includes(pass.id);
      return false;
  });

  return (
    <div className="bg-slate-50 relative overflow-hidden py-24 min-h-screen">
       {/* Background Tech Effects */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] opacity-50 pointer-events-none translate-y-1/2 -translate-x-1/2" />

       <div className="relative z-10">
           <SectionWrapper>
              <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-amber-300/50 shadow-md bg-[linear-gradient(110deg,#fef3c7,45%,#ffffff,55%,#fef3c7)] bg-[length:200%_100%] animate-shimmer overflow-hidden">
                      <span className="w-2 h-2 inline-block rounded-full bg-amber-500 mr-1 animate-pulse"></span>

                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                      Step 1: Choose Your <span className="text-blue-600">Profile</span>
                  </h2>
                  <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                      Select your category to begin registration. You will be redirected to the secure payment portal after entering your details.
                  </p>
              </div>

              {/* Step 1: Profile Selection */}
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                  {REGISTRATION_CATEGORIES.map((cat, idx) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                          <motion.div
                              key={cat.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              onClick={() => handleCategorySelect(cat.id)}
                              className={`
                                relative cursor-pointer group rounded-3xl p-8 border-2 transition-all duration-300 overflow-hidden
                                ${isSelected 
                                    ? 'bg-white border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.15)] scale-105 z-10' 
                                    : 'bg-white/60 border-white hover:border-blue-200 hover:shadow-xl hover:-translate-y-1'
                                }
                              `}
                          >
                              {/* Hover Gradient */}
                              <div className={`absolute inset-0 bg-gradient-to-br from-${cat.color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                              
                              <div className="relative z-10 flex flex-col items-center text-center">
                                  <div className={`w-16 h-16 rounded-2xl bg-${cat.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                      <cat.icon className={`w-8 h-8 text-${cat.color}-600`} />
                                  </div>

                                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{cat.title}</h3>
                                  <p className="text-sm text-slate-500 mb-6 font-medium">{cat.description}</p>
                                  
                                  <div className={`
                                      w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors
                                      ${isSelected ? `bg-${cat.color}-600 text-white` : 'bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'}
                                  `}>
                                      {isSelected ? 'Selected' : 'Select Category'}
                                  </div>
                              </div>
                          </motion.div>
                      );
                  })}
              </div>

              {/* Step 2: Pass Selection */}
              <AnimatePresence>
                {selectedCategory && (
                    <motion.div
                        id="pass-selection"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-20 overflow-hidden"
                    >
                         <div className="text-center mb-12 pt-8 border-t border-slate-200">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                                Step 2: Select Your <span className="text-orange-500">Pass</span>
                            </h2>
                            <p className="text-slate-500">Unlock premium features and exclusive access with our tiered passes.</p>
                         </div>

                         <div className="flex flex-wrap justify-center gap-8">
                            {filteredPasses.map((pass, idx) => {
                                const isSelected = selectedPass === pass.id;
                                const isPlatinum = pass.id === 'platinum';
                                return (
                                    <motion.div
                                        key={pass.id}
                                        initial="rest"
                                        whileHover="hover"
                                        animate={isSelected ? "selected" : "rest"}
                                        variants={{
                                            rest: { scale: 1, borderColor: "rgba(226, 232, 240, 1)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
                                            hover: { scale: 1.02, borderColor: "rgba(147, 197, 253, 0.5)", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
                                            selected: { scale: 1.05, borderColor: "rgba(37, 99, 235, 1)", boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.25)" }
                                        }}
                                        onClick={() => handlePassSelect(pass.id)}
                                        className={`
                                            relative cursor-pointer rounded-3xl p-8 border-2 transition-colors duration-300 flex flex-col w-full md:max-w-sm bg-white
                                            ${isPlatinum ? 'ring-4 ring-purple-500/10' : ''}
                                        `}
                                    >
                                        {isPlatinum && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1 z-20">
                                                <Star size={10} fill="white" /> Best Value
                                            </div>
                                        )}
                                        
                                        <div className="mb-8 border-b border-dashed border-slate-200 pb-8">
                                            <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 ${pass.accent}`}>
                                                {pass.name}
                                            </div>
                                            <div className="flex items-baseline gap-1 h-12">
                                                 <motion.span 
                                                    variants={{
                                                        rest: { scale: 1, originX: 0, color: "#0f172a" },
                                                        hover: { scale: 1.15, originX: 0, color: "#2563eb", textShadow: "0px 0px 8px rgba(37, 99, 235, 0.3)" },
                                                        selected: { scale: 1.15, originX: 0, color: "#2563eb" }
                                                    }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    className="text-4xl font-black tracking-tight text-slate-900"
                                                >
                                                    {pass.price}
                                                </motion.span>
                                                <motion.span 
                                                    variants={{
                                                        rest: { x: 0, opacity: 0.7 },
                                                        hover: { x: 15, opacity: 1 },
                                                        selected: { x: 15, opacity: 1 }
                                                    }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1"
                                                >
                                                    + 18% GST
                                                </motion.span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4 mb-8 flex-grow">
                                            {pass.perks.map((perk, pIdx) => (
                                                <motion.div 
                                                    key={pIdx} 
                                                    variants={{
                                                        rest: { x: 0 },
                                                        hover: { x: 5 },
                                                        selected: { x: 0 }
                                                    }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className={`mt-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center shrink-0 ${isPlatinum ? 'bg-purple-100 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                                        <Check size={10} />
                                                    </div>
                                                    <span className="text-sm text-slate-600 leading-snug">{perk}</span>
                                                </motion.div>
                                            ))}

                                            {/* Student Exclusive Perks */}
                                            {selectedCategory === 'student' && pass.id === 'silver' && (
                                                <>
                                                    <motion.div variants={{ rest: { x: 0 }, hover: { x: 5 }, selected: { x: 0 } }} className="flex items-start gap-3">
                                                        <div className="mt-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-blue-600"><Check size={10} /></div>
                                                        <span className="text-sm text-slate-600 leading-snug">Access to Micro-Panels</span>
                                                    </motion.div>
                                                </>
                                            )}

                                            {selectedCategory === 'student' && (pass.id === 'gold' || pass.id === 'platinum') && (
                                                <>
                                                    <motion.div variants={{ rest: { x: 0 }, hover: { x: 5 }, selected: { x: 0 } }} className="flex items-start gap-3">
                                                        <div className={`mt-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center shrink-0 ${isPlatinum ? 'bg-purple-100 text-purple-600' : 'bg-blue-50 text-blue-600'}`}><Check size={10} /></div>
                                                        <span className="text-sm text-slate-600 leading-snug">Access to All Panels</span>
                                                    </motion.div>
                                                </>
                                            )}
                                        </div>

                                        <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                                            {isSelected ? 'Pass Selected' : 'Choose Plan'}
                                        </button>
                                    </motion.div>
                                );
                            })}
                         </div>
                    </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3: Registration Form */}
              <AnimatePresence>
                  {selectedPass && (
                      <motion.div 
                        id="register-form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="max-w-2xl mx-auto pt-8 border-t border-slate-200"
                      >
                          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-12 relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />
                              
                              <h3 className="text-2xl font-bold text-slate-900 mb-2">Final Step: Your Details</h3>
                              <p className="text-slate-500 mb-8 text-sm">
                                  You are registering interest for: <span className="font-bold text-blue-600">{REGISTRATION_CATEGORIES.find(c => c.id === selectedCategory)?.title}</span> with <span className="font-bold text-orange-600">{PASS_TIERS.find(p => p.id === selectedPass)?.name}</span>
                              </p>

                              <form onSubmit={handleInitialSubmit} className="space-y-5">
                                  <div className="grid md:grid-cols-2 gap-5">
                                      <div className="space-y-2">
                                          <label className="text-sm font-bold text-slate-700">Full Name</label>
                                          <input 
                                              required 
                                              name="name"
                                              value={formData.name}
                                              onChange={handleChange}
                                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                              placeholder="Jane Doe"
                                          />
                                      </div>
                                      <div className="space-y-2">
                                          <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                          <input 
                                              required 
                                              name="phone"
                                              type="tel"
                                              value={formData.phone}
                                              onChange={handleChange}
                                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                              placeholder="+91 98765 43210"
                                          />
                                      </div>
                                  </div>

                                  <div className="space-y-2">
                                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                                      <input 
                                          required 
                                          name="email"
                                          type="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                          placeholder="jane@university.edu"
                                      />
                                  </div>

                                  <div className="space-y-2">
                                      <label className="text-sm font-bold text-slate-700">Institution / Organization</label>
                                      <input 
                                          required 
                                          name="organization"
                                          value={formData.organization}
                                          onChange={handleChange}
                                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                          placeholder="Ramaiah University / Tech Corp"
                                      />
                                  </div>

                                  <button 
                                      type="submit" 
                                      disabled={isSubmitting}
                                      className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 mt-4"
                                  >
                                      {isSubmitting ? (
                                          <>Processing <Loader2 className="animate-spin" /></>
                                      ) : (
                                          <>Proceed to Payment <ChevronRight /></>
                                      )}
                                  </button>
                                  <p className="text-xs text-center text-slate-400 mt-4">
                                      You will be redirected to the official RUAS payment portal to complete your registration.
                                  </p>
                              </form>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>
           </SectionWrapper>
       </div>
    </div>
  );
};

export default RegisterContent;
