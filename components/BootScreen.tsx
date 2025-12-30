
import React from 'react';
import { Sparkles } from 'lucide-react';

const BootScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="relative mb-8">
        <Sparkles className="w-16 h-16 text-blue-400 animate-pulse" />
      </div>
      <h1 className="text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300">
        Google AI Studio <span className="text-gray-500 font-extralight">OS</span>
      </h1>
      <p className="mt-2 text-gray-500 text-xs tracking-[0.3em] uppercase">Integrated Intelligence</p>
      
      <div className="mt-16 w-64 h-0.5 bg-gray-900 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 animate-[loading_3s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
