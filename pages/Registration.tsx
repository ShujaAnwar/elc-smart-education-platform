
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, Send, Info, User, Mail, Phone, BookOpen, Clock, MessageSquare } from 'lucide-react';
import { INITIAL_COURSES } from '../constants';

const Registration: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCourseId = queryParams.get('course') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    phone: '',
    courseId: initialCourseId,
    batchTiming: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialCourseId) {
      setFormData(prev => ({ ...prev, courseId: initialCourseId }));
    }
  }, [initialCourseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      // Save to mock database (localStorage)
      const registrations = JSON.parse(localStorage.getItem('elc_registrations') || '[]');
      const newReg = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('elc_registrations', JSON.stringify([...registrations, newReg]));
      
      setLoading(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-32 px-6 flex items-center justify-center">
        <div className="max-w-xl w-full glass p-16 rounded-[3rem] text-center border-white shadow-2xl animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Application Received!</h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Thank you for choosing ELC. Sir Salman's team will contact you via phone or email within 24 hours to confirm your registration.
          </p>
          <button 
            onClick={() => window.location.href = '#/'}
            className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 space-y-12">
            <div>
              <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Join ELC</h1>
              <p className="text-gray-500 leading-relaxed">
                Start your journey toward excellence. Fill out the form and our admissions team will handle the rest.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Info, title: 'Expert Guidance', desc: 'Get personalized feedback from Sir Salman.' },
                { icon: CheckCircle2, title: 'Official Certificate', desc: 'Receive a recognized certification upon completion.' },
                { icon: Clock, title: 'Flexible Batches', desc: 'Morning, afternoon, and evening slots available.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-indigo-900 rounded-3xl text-white">
              <h4 className="font-bold mb-4">Need Help?</h4>
              <p className="text-indigo-200 text-sm mb-6">Call our admissions office for immediate assistance.</p>
              <div className="font-black text-2xl tracking-tight">0321-2652922</div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-12 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Student Information</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Please enter details as per your ID card</p>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Full Name
                </label>
                <input 
                  required
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Muhammad Ahmed"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>

              {/* Father Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Father Name
                </label>
                <input 
                  required
                  type="text" 
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="e.g. Tariq Khan"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Phone size={14} /> Phone Number
                </label>
                <input 
                  required
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03xx-xxxxxxx"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 h-px bg-gray-50 my-4"></div>

              {/* Course */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={14} /> Select Course
                </label>
                <select 
                  required
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all appearance-none"
                >
                  <option value="">Choose a course</option>
                  {INITIAL_COURSES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Timing */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} /> Preferred Timing
                </label>
                <select 
                  required
                  name="batchTiming"
                  value={formData.batchTiming}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all appearance-none"
                >
                  <option value="">Choose a slot</option>
                  <option value="Morning (9 AM - 11 AM)">Morning (9 AM - 11 AM)</option>
                  <option value="Noon (1 PM - 3 PM)">Noon (1 PM - 3 PM)</option>
                  <option value="Evening (5 PM - 7 PM)">Evening (5 PM - 7 PM)</option>
                  <option value="Night (8 PM - 10 PM)">Night (8 PM - 10 PM)</option>
                </select>
              </div>

              {/* Message */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={14} /> Additional Message
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any questions or specific requirements?"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all min-h-[120px]"
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-8">
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Registration
                      <Send size={24} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
