
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { SITE_SETTINGS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="font-extrabold text-2xl text-gray-900 tracking-tight">{SITE_SETTINGS.shortName}</span>
            </Link>
            <p className="text-gray-500 leading-relaxed text-sm">
              Empowering students through language mastery and technological expertise. Join ELC to build a brighter future with Sir Salman.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Courses', 'About Us', 'Contact', 'Student Feedback'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-indigo-600 text-sm flex items-center gap-2 group transition-colors">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Courses</h4>
            <ul className="space-y-4">
              {['Spoken English', 'IELTS Preparation', 'Web Development', 'Digital Marketing', 'Graphic Design'].map((item) => (
                <li key={item}>
                  <Link to="/courses" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-500 text-sm">
                <MapPin size={18} className="text-indigo-600 shrink-0" />
                <span>{SITE_SETTINGS.address}</span>
              </li>
              <li className="flex gap-3 text-gray-500 text-sm items-center">
                <Phone size={18} className="text-indigo-600 shrink-0" />
                <span>{SITE_SETTINGS.phone}</span>
              </li>
              <li className="flex gap-3 text-gray-500 text-sm items-center">
                <Mail size={18} className="text-indigo-600 shrink-0" />
                <span className="break-all">{SITE_SETTINGS.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">© {new Date().getFullYear()} {SITE_SETTINGS.instituteName}. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-gray-400">
            <Link to="#" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link to="#" className="hover:text-indigo-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
