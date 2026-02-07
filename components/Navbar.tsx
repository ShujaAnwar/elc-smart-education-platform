
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <nav className="fixed top-0 w-full z-50 glass border-b border-indigo-100 px-6 py-4 flex justify-between items-center">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
          <span className="font-bold text-xl tracking-tight text-gray-800">ELC <span className="text-indigo-600">Admin</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">View Site</Link>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <User size={18} />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass shadow-lg' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform">E</div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tighter text-gray-900 leading-none">ELC</span>
            <span className="text-[10px] uppercase tracking-widest text-indigo-600 font-bold">Excellence Center</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-semibold transition-colors hover:text-indigo-600 ${location.pathname === link.path ? 'text-indigo-600' : 'text-gray-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/register" 
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-indigo-200 shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
          >
            Enroll Now
          </Link>
          <Link to="/admin" className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Admin Portal">
             <LayoutDashboard size={20} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full glass shadow-2xl md:hidden border-t border-white/20 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-gray-800 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/register" 
              onClick={() => setIsOpen(false)}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-center font-bold shadow-xl"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
