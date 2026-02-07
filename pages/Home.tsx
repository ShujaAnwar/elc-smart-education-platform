import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Globe, ShieldCheck, Zap, Monitor, MessageCircle, Quote, User } from 'lucide-react';
import { dataService } from '../services/dataService.ts';
import { SiteSettings, Testimonial } from '../types.ts';

const AnimatedCounter: React.FC<{ target: number; duration?: number; suffix?: string }> = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Home: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setSettings(dataService.getSettings());
    setTestimonials(dataService.getFeedback());
  }, []);

  if (!settings) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="space-y-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-indigo-100 mb-8 animate-in fade-in slide-in-from-bottom duration-700">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Enrolling for 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tighter">
            {settings.hero.title.split('. ').map((part, i) => (
              <React.Fragment key={i}>
                {i === 1 ? <><span className="gradient-text">{part}.</span><br/></> : <>{part}.<br/></>}
              </React.Fragment>
            ))}
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl leading-relaxed mb-12">
            {settings.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
              {settings.hero.ctaPrimary}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/courses" className="w-full sm:w-auto px-10 py-5 glass border-white text-gray-900 rounded-2xl font-bold text-lg hover:bg-white/40 transition-all">
              {settings.hero.ctaSecondary}
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Students Enrolled', target: 5000, suffix: '+' },
              { label: 'Courses Offered', target: 15, suffix: '+' },
              { label: 'Success Stories', target: 1000, suffix: '+' },
              { label: 'Years Experience', target: 10, suffix: '+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-1">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Why Choose {settings.shortName}?</h2>
          <p className="text-gray-500 max-w-xl mx-auto italic">Dedicated to excellence since 2014.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: 'Global Standards', desc: 'Our curriculum is designed to meet international standards for both Language and IT training.', color: 'bg-blue-50 text-blue-600' },
            { icon: ShieldCheck, title: 'Experienced Faculty', desc: `Learn directly from ${settings.founder}, a renowned educator with over a decade of experience.`, color: 'bg-green-50 text-green-600' },
            { icon: Zap, title: 'Modern Facilities', desc: 'Access high-tech computer labs and interactive language environments for hands-on learning.', color: 'bg-amber-50 text-amber-600' },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl glass hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}><item.icon size={28} /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instructor Section */}
      <section className="bg-indigo-900 py-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-800/50 skew-x-12 translate-x-1/2"></div>
         <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Double Your <br /> Potential Today.</h2>
               <p className="text-indigo-200 text-lg mb-12 max-w-lg leading-relaxed">
                  Communication and Technology are the two pillars of modern success. At ELC, we provide specialized training in both to give you a competitive edge.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                     <MessageCircle className="text-indigo-300 mb-4" size={32} />
                     <h4 className="text-white font-bold mb-2">English Mastery</h4>
                     <p className="text-indigo-200 text-sm">Spoken, IELTS, Grammar & Professional Communication.</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                     <Monitor className="text-indigo-300 mb-4" size={32} />
                     <h4 className="text-white font-bold mb-2">IT Excellence</h4>
                     <p className="text-indigo-200 text-sm">Full-Stack Web, AI Tools, MS Office & Data Basics.</p>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2">
               <div className="relative">
                  <img src={settings.hero.bannerImage} alt="Learning" className="rounded-3xl shadow-2xl animate-float" />
                  <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl hidden md:block animate-in zoom-in duration-1000">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                           <User size={24} />
                        </div>
                        <div>
                           <div className="font-black text-gray-900">{settings.instructor.name}</div>
                           <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{settings.instructor.title}</div>
                        </div>
                     </div>
                     <p className="text-gray-500 text-sm italic max-w-xs">"{settings.instructor.bio.slice(0, 100)}..."</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Our Success Stories</h2>
            <p className="text-gray-500">Hear it from our brilliant alumni who are now leading in their fields.</p>
          </div>
          <Link to="/contact" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
            Share Your Experience <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.filter(t => t.featured && t.approved).map((t) => (
            <div key={t.id} className="p-10 rounded-3xl glass border-indigo-50 relative">
              <Quote className="absolute top-8 right-10 text-indigo-100" size={60} />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (<Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />))}
              </div>
              <p className="text-gray-700 text-lg mb-8 italic leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">{t.name[0]}</div>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-indigo-600 font-medium">{t.course} Alumni</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;