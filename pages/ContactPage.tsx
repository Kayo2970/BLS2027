
import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, ExternalLink, Linkedin, Instagram, Facebook, Youtube, AtSign } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_EMAIL } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Get in" 
        subtitle="Have questions? We are here to help you."
        highlight="Touch"
      />
      <div className="bg-slate-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-3 gap-8">
                  {/* Contact Info Cards */}
                  <div className="space-y-6">
                      <a 
                        href="tel:+919110673919"
                        className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-start gap-4 hover:border-blue-300 hover:shadow-blue-500/5 transition-all group cursor-pointer"
                      >
                           <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                               <Phone />
                           </div>
                           <div className="flex-grow">
                               <h4 className="font-bold text-slate-900">Call Us</h4>
                               <p className="text-slate-500 text-sm mt-1 group-hover:text-slate-900 transition-colors">+91 91106 73919</p>
                               <p className="text-slate-500 text-sm group-hover:text-slate-900 transition-colors">+91 80183 75553</p>
                               <p className="text-slate-500 text-sm group-hover:text-slate-900 transition-colors">+91 78992 93097</p>
                           </div>
                           <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-500" />
                      </a>
                      
                      <a 
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-start gap-4 hover:border-orange-300 hover:shadow-orange-500/5 transition-all group cursor-pointer"
                      >
                           <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                               <Mail />
                           </div>
                           <div className="flex-grow">
                               <h4 className="font-bold text-slate-900">Email Us</h4>
                               <p className="text-slate-500 text-sm mt-1 group-hover:text-slate-900 transition-colors">{CONTACT_EMAIL}</p>
                           </div>
                           <ExternalLink size={14} className="text-slate-300 group-hover:text-orange-500" />
                      </a>

                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-start gap-4">
                           <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                               <MapPin />
                           </div>
                           <div>
                               <h4 className="font-bold text-slate-900">Visit Us</h4>
                               <p className="text-slate-500 text-sm mt-1">
                                   University House, New BEL Rd,<br/>
                                   M S R Nagar, Mathikere,<br/>
                                   Bengaluru, Karnataka 560054
                               </p>
                           </div>
                      </div>

                      {/* Social Prompt */}
                      <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ExternalLink size={100} />
                        </div>
                        <h4 className="font-bold text-xl mb-2 relative z-10">Follow Our Journey</h4>
                        <p className="text-slate-400 text-sm mb-6 relative z-10">Get real-time updates on speakers and events.</p>
                        <div className="flex flex-wrap gap-3 relative z-10">
                            {[
                                { Icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                                { Icon: Instagram, href: SOCIAL_LINKS.instagram_bls, label: 'Summit Instagram' },
                                { Icon: Instagram, href: SOCIAL_LINKS.instagram_leads, label: 'Center Instagram' },
                                { Icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                                { Icon: Youtube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
                                { Icon: AtSign, href: SOCIAL_LINKS.threads, label: 'Threads' }
                            ].map(({ Icon, href, label }, idx) => (
                                <a 
                                    key={idx}
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title={label}
                                    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl text-white hover:scale-110 transition-all duration-300 shadow-lg border border-white/5"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                      </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-2">
                      <ContactForm />
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default ContactPage;
