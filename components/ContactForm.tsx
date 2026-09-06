import React, { useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { WHATSAPP_NUMBER, GOOGLE_SCRIPT_URL } from '../constants';

const ContactForm: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill subject/message if state is passed (e.g. from Sponsorship or Events)
  useEffect(() => {
    if (location.state) {
      const { plan, waitlist } = location.state;
      if (waitlist) {
         setFormData(prev => ({ 
          ...prev, 
          subject: 'Join Waitlist',
          message: `I am interested in joining the priority waitlist for: ${waitlist.replace('Waitlist: ', '')}` 
        }));
      } else if (plan) {
        setFormData(prev => ({ 
          ...prev, 
          subject: 'Sponsorship Opportunity',
          message: `I am interested in the ${plan} plan.` 
        }));
      }
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
        // 1. Send to Google Sheets
        // NOTE: This fetch will fail unless a valid GOOGLE_SCRIPT_URL is provided in constants.ts
        // We wrap it in a try-catch that doesn't block the user flow if it fails (common in static demos)
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            console.log("Google Sheets submission skipped: URL not configured.");
        }

        // 2. Redirect to WhatsApp
        const whatsappMessage = `*New Inquiry from Website* %0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });

    } catch (error) {
        console.error("Error submitting form", error);
        alert("There was an issue submitting the form. Redirecting you to WhatsApp directly.");
        const whatsappMessage = `Hi, I tried to contact you via the website but had an issue. My name is ${formData.name}.`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        placeholder="John Doe" 
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        placeholder="john@company.com" 
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Subject</label>
                <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                    <option>General Inquiry</option>
                    <option>Join Waitlist</option>
                    <option>Sponsorship Opportunity</option>
                    <option>Student Registration</option>
                    <option>Media Partnership</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Message</label>
                <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32" 
                    placeholder="How can we help you?"
                    required
                ></textarea>
            </div>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>Sending... <Loader2 className="animate-spin" size={18} /></>
                ) : (
                    <>Send Message <Send size={18} /></>
                )}
            </button>
            <p className="text-xs text-center text-slate-400 mt-4">
                This will capture your details and open WhatsApp to send the message directly to our team.
            </p>
        </form>
    </div>
  );
};

export default ContactForm;