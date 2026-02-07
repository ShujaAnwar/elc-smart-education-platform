
import React, { useState, useEffect } from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { dataService } from '../services/dataService';
import { SiteSettings } from '../types';

const WhatsAppButton: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const config = dataService.getSettings();
    setSettings(config);

    if (config.whatsappConfig.businessHoursEnabled) {
      const checkStatus = () => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const [startH, startM] = config.whatsappConfig.startHour.split(':').map(Number);
        const [endH, endM] = config.whatsappConfig.endHour.split(':').map(Number);
        
        const startTime = startH * 60 + startM;
        const endTime = endH * 60 + endM;
        
        setIsOffline(currentTime < startTime || currentTime > endTime);
      };
      
      checkStatus();
      const interval = setInterval(checkStatus, 60000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!settings || !settings.whatsappConfig.enabled) return null;

  const { number, defaultMessage, position, offlineMessage } = settings.whatsappConfig;
  const message = isOffline ? offlineMessage : defaultMessage;
  const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  const positionClasses = position === 'right' ? 'right-6' : 'left-6';

  return (
    <div className={`fixed bottom-24 ${positionClasses} z-[55] animate-in slide-in-from-bottom duration-500`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3"
      >
        <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none hidden md:block">
          <p className="text-xs font-bold text-gray-800 whitespace-nowrap">
            {isOffline ? 'We are currently offline' : 'Chat with ELC'}
          </p>
        </div>
        <div className={`w-14 h-14 ${isOffline ? 'bg-gray-500' : 'bg-[#25D366]'} text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative`}>
          <MessageCircle size={28} />
          {isOffline && (
            <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-lg">
              <Clock size={12} />
            </div>
          )}
          <span className={`absolute inset-0 rounded-full ${isOffline ? 'bg-gray-500/20' : 'bg-[#25D366]/20'} animate-ping -z-10`}></span>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
