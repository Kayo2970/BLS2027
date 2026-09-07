
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Youtube, AtSign, Map as MapIcon } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_EMAIL, LOGO_URL } from '../constants';

const Contact: React.FC = () => {
  const [mapActive, setMapActive] = useState(false);

  return (
    <footer id="contact" className="bg-[#0f172a] pt-20 pb-10 relative overflow-hidden text-white">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                             <img 
                                src={LOGO_URL}
                                alt="Logo" 
                                className="w-full h-full object-contain" 
                             />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight leading-none">BHARAT<span className="text-blue-500">LEAD</span></h2>
                            <span className="text-[10px] text-slate-400 tracking-[0.3em] uppercase block">Summit 2027</span>
                        </div>
                    </div>
                    <p className="text-slate-400 mb-8 max-w-md text-sm leading-relaxed">
                        Organized by Centre for Leadership Empowering Attitude Development for Sustainability (LEADS Next Gen Centre), Ramaiah University of Applied Sciences.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        {[
                            { Icon: Linkedin, href: SOCIAL_LINKS.linkedin, color: 'hover:bg-[#0077b5]', label: 'LinkedIn' },
                            { Icon: Instagram, href: SOCIAL_LINKS.instagram_bls, color: 'hover:bg-[#E1306C]', label: 'Summit Instagram' },
                            { Icon: Instagram, href: SOCIAL_LINKS.instagram_leads, color: 'hover:bg-[#E1306C]', label: 'LEADS Instagram' },
                            { Icon: Facebook, href: SOCIAL_LINKS.facebook, color: 'hover:bg-[#1877F2]', label: 'Facebook' },
                            { Icon: Youtube, href: SOCIAL_LINKS.youtube, color: 'hover:bg-[#FF0000]', label: 'YouTube' },
                            { Icon: AtSign, href: SOCIAL_LINKS.threads, color: 'hover:bg-black', label: 'Threads' }
                        ].map(({ Icon, href, color, label }, idx) => (
                            <a 
                                key={idx} 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                title={label}
                                className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${color} hover:text-white text-slate-400 transition-all duration-300`}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-bold mb-6 text-lg text-white">Contact Us</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li className="flex items-start gap-3 group">
                            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                <Phone className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="mt-1 font-mono">
                                +91 91106 73919 <br />
                                +91 80183 75553 <br />
                                +91 78992 93097
                            </span>
                        </li>
                        <li className="flex items-start gap-3 group">
                            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                <Mail className="w-4 h-4 text-blue-500" />
                            </div>
                            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 hover:text-white transition-colors">{CONTACT_EMAIL}</a>
                        </li>
                    </ul>
                </div>

                {/* Address */}
                <div>
                    <h4 className="font-bold mb-6 text-lg text-white">Location</h4>
                    <div className="flex items-start gap-3 text-slate-400 text-sm group">
                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                            <MapPin className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="mt-1 leading-relaxed">
                            University House, New BEL Rd,<br />
                            M S R Nagar, Mathikere,<br />
                            Bengaluru, Karnataka 560054
                        </p>
                    </div>
                </div>
            </div>

            {/* Map Integration with Scroll Trap Fix */}
            <div className="w-full h-64 rounded-2xl overflow-hidden mb-12 border border-slate-800 shadow-2xl relative group">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.082729289279!2d77.56345637507746!3d13.02941398729119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17d967b55555%3A0x76f576d756d1180!2sUniversity%20House!5e0!3m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, pointerEvents: mapActive ? 'auto' : 'none' }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Overlay to enable interaction */}
                {!mapActive && (
                    <div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity hover:bg-black/30"
                        onClick={() => setMapActive(true)}
                    >
                        <button className="bg-slate-900 text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                            <MapIcon size={16} /> Click to Interact with Map
                        </button>
                    </div>
                )}
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs">
                    © 2026 LEADS Next Gen Centre. All rights reserved.
                </p>
                <p className="text-slate-500 text-xs flex items-center gap-1">
                    Designed & Developed by 
                    <a 
                        href="https://www.linkedin.com/in/syedndx/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-300 font-bold hover:text-blue-500 transition-colors"
                    >
                        Syed Furqaan Ahmed
                    </a>
                </p>
            </div>
        </div>
    </footer>
  );
};

export default Contact;
