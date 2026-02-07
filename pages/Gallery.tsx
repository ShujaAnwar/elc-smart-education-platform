
import React from 'react';
import { GALLERY_ITEMS } from '../constants';

const Gallery: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">ELC Moments</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto italic">
            Capturing the journey of learning and success at The Excellent Language Center.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="break-inside-avoid group relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100">
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all p-8 flex flex-col justify-end">
                <span className="text-[10px] text-indigo-300 font-black uppercase tracking-widest mb-2">{item.category}</span>
                <h4 className="text-white font-bold text-xl">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <button className="px-10 py-4 glass border-indigo-100 text-indigo-600 font-bold rounded-2xl hover:bg-white transition-all shadow-sm">
              Load More Photos
           </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
