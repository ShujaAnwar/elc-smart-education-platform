
import React, { useState, useEffect } from 'react';
import { Target, Eye, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import { dataService } from '../services/dataService';
import { SiteSettings } from '../types';

const About: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(dataService.getSettings());
  }, []);

  if (!settings) return null;

  return (
    <div className="pt-32 pb-24 px-6 space-y-32 overflow-hidden">
      {/* Intro */}
      <section className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tighter">
              Defining <span className="gradient-text">Excellence</span> <br /> In Education.
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed mb-8">
              Founded by <strong>{settings.instructor.name}</strong>, {settings.instituteName} ({settings.shortName}) has been a beacon of learning in Karachi for over a decade. We believe that mastery of language and technology are essential keys to personal and professional freedom.
            </p>
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100 mb-8">
              <div>
                <div className="text-4xl font-black text-indigo-600 mb-2">2014</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Year Established</div>
              </div>
              <div>
                <div className="text-4xl font-black text-indigo-600 mb-2">5,000+</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Graduated Students</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-50 rounded-full -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-full -z-10"></div>
            <img src="https://images.unsplash.com/photo-1523050853021-eb95139583b5?q=80&w=2070&auto=format&fit=crop" alt="ELC Campus" className="rounded-[3rem] shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-24 -mx-6 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-12 bg-white rounded-[3rem] shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Our Mission</h2>
            <p className="text-gray-500 leading-relaxed">
              To provide accessible, high-quality education in English language and modern technology, empowering students from all walks of life to achieve their full potential and succeed in a globalized world.
            </p>
          </div>
          <div className="p-12 bg-white rounded-[3rem] shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Our Vision</h2>
            <p className="text-gray-500 leading-relaxed">
              To be the premier institute for language and technical excellence in Pakistan, recognized for our innovative teaching methods, dedicated faculty, and the outstanding achievements of our alumni.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="container mx-auto">
        <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="lg:w-full relative z-10 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Meet {settings.instructor.name}</h2>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
              <Award className="text-indigo-300" />
              <span className="text-indigo-100 font-bold uppercase tracking-widest text-xs">{settings.instructor.title}</span>
            </div>
            <p className="text-indigo-100 text-lg leading-relaxed mb-8 max-w-4xl mx-auto lg:mx-0">
              {settings.instructor.bio}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/5">
                <ShieldCheck className="text-indigo-300" size={24} />
                <span className="text-white font-bold">IELTS Specialist</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/5">
                <Users className="text-indigo-300" size={24} />
                <span className="text-white font-bold">Professional Mentor</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/5">
                <Heart className="text-indigo-300" size={24} />
                <span className="text-white font-bold">Community Advocate</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/5">
                <Award className="text-indigo-300" size={24} />
                <span className="text-white font-bold">Tech Evangelist</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
