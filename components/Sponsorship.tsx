

import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SPONSORSHIP_MATRIX } from '../constants';
import { Check, ShieldCheck, Zap, Info, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SponsorshipCardProps {
    name: string;
    price: string;
    features: string[];
    isPremium: boolean;
    badgeText?: string;
    onSelect: () => void;
    colorTheme?: 'blue' | 'purple';
    description?: string;
    className?: string;
}

const SponsorshipCard: React.FC<SponsorshipCardProps> = ({ 
    name, 
    price, 
    features, 
    isPremium, 
    badgeText,
    onSelect,
    colorTheme = 'blue',
    description,
    className = ""
}) => {
    const themeStyles = {
        blue: {
            badge: 'bg-blue-50 text-blue-700 border-blue-100',
            button: 'bg-slate-900 text-white hover:bg-blue-600',
            check: 'text-blue-500',
            border: isPremium ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border-white/50 hover:border-blue-200',
            highlight: 'bg-gradient-to-r from-blue-600 to-cyan-500',
            glow: 'from-blue-500/10 to-transparent'
        },
        purple: {
            badge: 'bg-purple-50 text-purple-700 border-purple-100',
            button: 'bg-slate-900 text-white hover:bg-purple-600',
            check: 'text-purple-500',
            border: isPremium ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' : 'border-white/50 hover:border-purple-200',
            highlight: 'bg-gradient-to-r from-purple-600 to-indigo-500',
            glow: 'from-purple-500/10 to-transparent'
        }
    }[colorTheme];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className={`
                relative rounded-3xl p-1 overflow-hidden transition-all duration-300 h-full flex flex-col
                ${isPremium ? 'shadow-2xl' : 'shadow-xl'}
                ${className}
            `}
        >
             {/* Gradient Border for Premium cards */}
             {isPremium && (
                 <div className={`absolute inset-0 bg-gradient-to-br ${themeStyles.highlight} opacity-20 pointer-events-none`} />
             )}

            <div className={`
                relative h-full flex flex-col bg-white rounded-[1.3rem] p-8 border
                ${themeStyles.border}
            `}>
                
                {/* Badge */}
                {(isPremium || badgeText) && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1 z-20 text-white ${themeStyles.highlight}`}>
                        <Star size={10} fill="white" /> {badgeText || "Most Popular"}
                    </div>
                )}

                <div className="mb-8 pb-6 border-b border-dashed border-slate-200 relative z-10 text-center">
                    <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border ${themeStyles.badge}`}>
                        {name}
                    </span>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-4xl font-black tracking-tight text-slate-900">{price}</span>
                    </div>
                    {description && (
                        <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                <div className="space-y-3 mb-8 flex-grow relative z-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 group">
                            <div className={`mt-0.5 shrink-0 transition-transform group-hover:scale-110 ${themeStyles.check}`}>
                                <Check size={16} strokeWidth={2.5} />
                            </div>
                            <span className="text-sm text-slate-600 font-medium leading-snug group-hover:text-slate-900 transition-colors">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={onSelect}
                    className={`
                        w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg relative overflow-hidden group
                        ${themeStyles.button}
                    `}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Choose Plan
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
            </div>
        </motion.div>
    );
};

const Sponsorship: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planName: string) => {
    navigate('/contact', { state: { waitlist: `Waitlist: ${planName}` } });
  };

  const corporateCards = SPONSORSHIP_MATRIX.corporate.tiers.map(tier => {
      let description = "";
      if (tier.name.includes("Title")) description = "Maximum brand visibility and top-tier recognition.";
      else if (tier.name.includes("Platinum")) description = "The ultimate partnership with prestigious awards and maximum visibility.";
      else if (tier.name.includes("Gold")) description = "Premium branding with exclusive panel speaker opportunities.";
      else if (tier.name.includes("Co-Sponsor")) description = "High-impact branding and strategic engagement.";
      else if (tier.name.includes("Event")) description = "Excellent visibility and engagement with the delegate audience.";
      
      return { ...tier, description };
  });

  const educationalCards = SPONSORSHIP_MATRIX.educational.tiers.map(tier => {
      let description = "";
      if (tier.name.includes("Academic")) description = "High-impact branding and strategic engagement.";
      else if (tier.name.includes("Co-Host")) description = "Excellent visibility and engagement with the delegate audience.";
      
      return { ...tier, description };
  });

  return (
    <div className="bg-slate-50 relative py-12 md:py-20 overflow-hidden">
      {/* Dynamic Background with Tech Elements - Kept for section background only, removed from cards */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-slate opacity-[0.04] pointer-events-none" />

      <SectionWrapper id="sponsorship" className="scroll-mt-24 relative z-10">
        <div className="text-center mb-16">
            <div className="inline-block p-3 rounded-2xl bg-white border border-slate-200 text-blue-600 mb-6 shadow-sm">
                <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Partnership <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Opportunities</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                Unlock exclusive access to India's top sustainability leaders. Choose the tier that aligns with your brand's vision.
            </p>
        </div>

        {/* Corporate Section */}
        <div className="mb-24">
            <div className="flex items-center gap-4 mb-10 justify-center">
                 <div className="h-px bg-slate-300 w-12 md:w-24 opacity-50"></div>
                 <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="text-blue-500 fill-current" size={20} />
                    {SPONSORSHIP_MATRIX.corporate.title}
                 </h3>
                 <div className="h-px bg-slate-300 w-12 md:w-24 opacity-50"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
                {corporateCards.map((card, idx) => {
                    // Premium logic: Title (2), Gold (3), Platinum (4)
                    const isPremium = idx >= 2; 
                    let badgeText = undefined;
                    if (idx === 2) badgeText = "Exclusive"; // Title
                    else if (idx === 4) badgeText = "Most Popular"; // Platinum

                    // Dynamic Width Logic:
                    // First 3 items (Indices 0,1,2): 33% width on LG screens (3 per row)
                    // Last 2 items (Indices 3,4): 50% width on LG screens (2 per row)
                    const widthClass = idx < 3 
                        ? "lg:w-[calc(33.333%-16px)]" 
                        : "lg:w-[calc(50%-12px)]";

                    return (
                        <div 
                            key={idx}
                            className={`w-full md:w-[calc(50%-12px)] ${widthClass}`}
                        >
                            <SponsorshipCard 
                                name={card.name}
                                price={card.price}
                                features={card.benefits}
                                description={card.description}
                                isPremium={isPremium}
                                badgeText={badgeText}
                                onSelect={() => handleSelectPlan(card.name)}
                                colorTheme="blue"
                                className="h-full"
                            />
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Educational Section */}
        <div className="mb-24">
            <div className="flex items-center gap-4 mb-10 justify-center">
                 <div className="h-px bg-slate-300 w-12 md:w-24 opacity-50"></div>
                 <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <div className="bg-purple-100 p-1 rounded">
                         <ShieldCheck className="text-purple-600" size={16} />
                    </div>
                    {SPONSORSHIP_MATRIX.educational.title}
                 </h3>
                 <div className="h-px bg-slate-300 w-12 md:w-24 opacity-50"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                {educationalCards.map((card, idx) => (
                    <div key={idx} className="w-full md:w-[calc(50%-12px)]">
                        <SponsorshipCard 
                            name={card.name}
                            price={card.price}
                            features={card.benefits}
                            description={card.description}
                            isPremium={idx === 1} // Academic Sponsor is premium
                            onSelect={() => handleSelectPlan(card.name)}
                            colorTheme="purple"
                            className="h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Sponsorship;
