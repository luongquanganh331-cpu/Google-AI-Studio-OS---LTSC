
import React, { useState, useEffect } from 'react';
import { ArrowRight, User, Key, Camera } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

const LockScreen: React.FC<Props> = ({ onLogin }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('vi-VN', options).toUpperCase();
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-900 via-black to-purple-950 flex flex-col items-center justify-center relative">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
        <h2 className="text-[120px] font-semibold leading-none tracking-tighter opacity-80">
          {formatTime(time)}
        </h2>
        <p className="text-blue-300 tracking-[0.2em] font-medium mt-4">
          {formatDate(time)}
        </p>
      </div>

      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <div className="relative group mb-6">
          <div className="w-32 h-32 rounded-full border-2 border-gray-700 p-1 bg-black/40 overflow-hidden flex items-center justify-center">
            <User className="w-16 h-16 text-gray-500" />
          </div>
          <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full text-black shadow-lg cursor-pointer transform hover:scale-110 transition">
            <Camera className="w-5 h-5" />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-1">anhdaynekkkk</h3>
        <p className="text-gray-400 text-sm mb-8">No password required</p>

        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Studio Access Code"
            className="w-80 h-12 rounded-full bg-white/10 border border-white/20 px-6 pr-24 outline-none focus:bg-white/15 focus:border-blue-500/50 transition-all text-center placeholder:text-gray-500"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
          />
          <div className="absolute right-12 text-gray-400">
            <Key className="w-5 h-5" />
          </div>
          <button 
            onClick={onLogin}
            className="absolute right-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition group"
          >
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 text-gray-600 text-[10px] uppercase tracking-[0.4em]">
        Google AI Studio • OS v2.5-LTSC
      </div>
    </div>
  );
};

export default LockScreen;
