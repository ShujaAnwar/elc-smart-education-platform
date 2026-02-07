
import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, Globe, Share2 } from 'lucide-react';
import { SITE_SETTINGS } from '../constants';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your inquiry has been sent. We'll get back to you soon.");
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Let's Connect</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Have questions about batches, fees, or course modules? Reach out to us directly or visit our campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="p-10 rounded-[3rem] glass border-white flex flex-col gap-8 shadow-sm">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Visit Us</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{SITE_SETTINGS.address}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Call Anytime</h4>
                  <p className="text-gray-500 text-sm">{SITE_SETTINGS.phone}</p>
                  <a href={`tel:${SITE_SETTINGS.phone}`} className="text-indigo-600 text-sm font-bold hover:underline">Click to call</a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Email Support</h4>
                  <p className="text-gray-500 text-sm break-all">{SITE_SETTINGS.email}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Follow Our Journey</h4>
                <div className="flex gap-4">
                  {[Share2, Globe, MessageCircle].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
                      <Icon size={20} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <a 
              href={`https://wa.me/${SITE_SETTINGS.whatsapp.replace('+', '')}`} 
              className="block p-8 bg-[#25D366] text-white rounded-[3rem] shadow-xl hover:-translate-y-1 transition-all text-center group"
            >
              <div className="flex items-center justify-center gap-3">
                <MessageCircle size={32} />
                <span className="text-2xl font-black">WhatsApp Us</span>
              </div>
              <p className="mt-2 text-white/80 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Instant Reply Available</p>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 h-full">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Send a Quick Message</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-indigo-600 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Your Email</label>
                  <input required type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-indigo-600 transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Subject</label>
                  <input required type="text" placeholder="Regarding Spoken English Course" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-indigo-600 transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Message</label>
                  <textarea required placeholder="Write your message here..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-indigo-600 transition-all min-h-[150px]"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                    Send Inquiry <Send size={24} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 h-96 bg-gray-100 rounded-[3rem] overflow-hidden border border-gray-200 relative group">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10">
                 <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <MapPin size={32} />
                 </div>
                 <h4 className="font-bold text-gray-900">ELC Main Campus</h4>
                 <p className="text-gray-500 text-sm">Saudabad, Malir, Karachi</p>
              </div>
           </div>
           {/* In a real scenario, an iframe with Google Maps would go here */}
           <div className="absolute inset-0 bg-indigo-50/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="px-6 py-3 bg-white rounded-full font-bold shadow-lg text-gray-800">Interactive Map Coming Soon</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
