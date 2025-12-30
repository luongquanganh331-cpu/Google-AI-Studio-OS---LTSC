
import React, { useState, useRef } from 'react';
import { X, Minus, Square, ChevronLeft, ChevronRight, RotateCcw, Search, Globe, Home, Shield } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const BrowserWindow: React.FC<Props> = ({ onClose }) => {
  const [inputUrl, setInputUrl] = useState('https://www.google.com/search?igu=1');
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com/search?igu=1');
  const [isHomePage, setIsHomePage] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let url = inputUrl.trim();
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    setCurrentUrl(url);
    setIsHomePage(false);
  };

  const goHome = () => {
    setIsHomePage(true);
    setInputUrl('Home');
  };

  const refresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="app-window absolute top-8 left-8 right-8 bottom-20 glass rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/20 z-40">
      {/* Title Bar */}
      <div className="h-10 bg-black/60 flex items-center px-4 gap-4 justify-between select-none border-b border-white/5">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400" />
          <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">AI Studio Web Browser</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
            <Shield className="w-3 h-3 text-green-500" />
            <span className="text-[9px] text-green-500 font-bold uppercase">Encrypted</span>
          </div>
          <div className="flex items-center gap-3 ml-2">
            <Minus className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition" />
            <Square className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer transition" />
            <X 
              className="w-4 h-4 text-gray-500 hover:text-red-400 cursor-pointer transition" 
              onClick={onClose}
            />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-14 bg-white/5 border-b border-white/10 flex items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => window.history.forward()} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition">
            <ChevronRight className="w-5 h-5" />
          </button>
          <button onClick={refresh} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={goHome} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition">
            <Home className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleNavigate} className="flex-1 group">
          <div className="h-9 bg-black/40 rounded-xl border border-white/10 flex items-center px-4 gap-3 text-sm text-gray-300 focus-within:border-blue-500/50 focus-within:bg-black/60 transition-all">
            <Globe className="w-3.5 h-3.5 text-gray-500 group-focus-within:text-blue-400" />
            <input 
              type="text" 
              value={inputUrl} 
              onChange={(e) => setInputUrl(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs font-medium placeholder:text-gray-600"
              placeholder="Enter URL or search..."
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-[10px] font-bold">
            AI
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-hidden relative">
        {isHomePage ? (
          <div className="absolute inset-0 bg-[#0f0f0f] flex flex-col items-center justify-center p-8">
             <div className="mb-12 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                   <Globe className="w-10 h-10 text-blue-400" />
                </div>
                <h1 className="text-4xl font-light text-white mb-2">AI Studio <span className="text-blue-500 font-medium">Search</span></h1>
                <p className="text-gray-500 text-sm">Secure exploration mode enabled</p>
             </div>

             <div className="w-full max-w-2xl relative mb-12">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search the decentralized web..."
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-lg text-white outline-none focus:bg-white/10 focus:border-blue-500/30 transition shadow-2xl"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const query = (e.target as HTMLInputElement).value;
                      setInputUrl(`https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`);
                      setCurrentUrl(`https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`);
                      setIsHomePage(false);
                    }
                  }}
                />
             </div>

             <div className="grid grid-cols-4 gap-6 w-full max-w-2xl">
                {[
                  { name: 'Google', url: 'https://www.google.com/search?igu=1', color: 'bg-red-500' },
                  { name: 'Wikipedia', url: 'https://en.m.wikipedia.org', color: 'bg-gray-500' },
                  { name: 'Gemini AI', url: 'https://gemini.google.com', color: 'bg-blue-500' },
                  { name: 'GitHub', url: 'https://github.com', color: 'bg-slate-800' },
                ].map(site => (
                  <button 
                    key={site.name}
                    onClick={() => {
                      setInputUrl(site.url);
                      setCurrentUrl(site.url);
                      setIsHomePage(false);
                    }}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className={`w-14 h-14 ${site.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                      <span className="text-lg font-bold text-white">{site.name[0]}</span>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-white transition">{site.name}</span>
                  </button>
                ))}
             </div>
             
             <div className="absolute bottom-8 text-[10px] text-gray-700 uppercase tracking-[0.3em]">
                Protected by LTSC Security Kernel
             </div>
          </div>
        ) : (
          <iframe 
            ref={iframeRef}
            src={currentUrl} 
            className="w-full h-full border-none"
            title="Browser Content"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        )}
        
        {/* Loading Bar Simulation */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent overflow-hidden">
          <div className="h-full bg-blue-500 w-1/3 animate-[browse-load_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes browse-load {
          0% { transform: translateX(-100%); width: 10%; }
          50% { width: 30%; }
          100% { transform: translateX(1000%); width: 10%; }
        }
      `}</style>
    </div>
  );
};

export default BrowserWindow;
