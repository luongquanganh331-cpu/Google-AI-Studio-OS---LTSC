
import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, ShieldCheck, Sun } from 'lucide-react';

const SystemTray: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [showQuickSettings, setShowQuickSettings] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4 text-gray-400 relative">
      <div 
        className="flex items-center gap-3 glass py-1 px-4 rounded-full cursor-pointer hover:bg-white/10 transition"
        onClick={() => setShowQuickSettings(!showQuickSettings)}
      >
        <Wifi className="w-4 h-4 text-blue-400" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4 text-green-400" />
        <span className="text-xs font-bold text-white tracking-tight">
          {time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {showQuickSettings && (
        <div className="absolute bottom-14 right-0 w-80 glass rounded-3xl p-6 shadow-2xl border border-white/10 z-[200]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-bold">A</span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">anhdaynekkkk</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Administrator</div>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-green-400" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-blue-600 rounded-2xl p-4 flex flex-col gap-2">
              <Wifi className="w-5 h-5" />
              <div className="text-xs font-bold">Network</div>
              <div className="text-[10px] opacity-70">Studio_5G</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 flex flex-col gap-2">
              <Sun className="w-5 h-5" />
              <div className="text-xs font-bold">Mode</div>
              <div className="text-[10px] opacity-70">Dark Visuals</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Volume2 className="w-4 h-4" />
              <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                <div className="w-[75%] h-full bg-blue-500 rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Sun className="w-4 h-4" />
              <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                <div className="w-[45%] h-full bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Neural Core Online</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase">99% Battery</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemTray;
