
import React, { useState, useEffect } from 'react';
import { Search, Clock, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Course } from '../types';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'English' | 'Computer'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCourses(dataService.getCourses().filter(c => c.published));
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen px-6">
      <div className="container mx-auto">
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Expert Courses</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Choose the path that fits your goals. Led by industry professionals with global certification.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16">
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-full md:w-auto">
            {['All', 'English', 'Computer'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map((course) => (
            <div key={course.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{course.category}</span>
                  <span className="px-4 py-1.5 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-full">{course.level}</span>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-indigo-600" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{course.duration}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">{course.description}</p>
                <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Course Fee</span>
                    <span className="text-xl font-black text-gray-900">{course.fee}</span>
                  </div>
                  <Link to={`/register?course=${course.id}`} className="w-12 h-12 bg-gray-50 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-40">
            <GraduationCap size={40} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
