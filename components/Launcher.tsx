
import React from 'react';
import { Search, FileText, Settings, LayoutGrid } from 'lucide-react';
import { AppType } from '../types';
import { SYSTEM_FILES, DESKTOP_APPS } from '../constants';

interface Props {
  onSelect: (app: AppType) => void;
}

const Launcher: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="w-[850px] max-h-[90vh] glass rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold">G</div>
        <input 
          type="text" 
          placeholder="Search your tabs, files, apps, and more..."
          className="w-full h-14 bg-white/5 rounded-2xl border border-white/10 pl-20 pr-6 text-lg outline-none focus:bg-white/10 transition"
          autoFocus
        />
      </div>

      {/* Continue Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between text-gray-500 uppercase text-xs tracking-widest font-semibold mb-6">
          <span>Continue where you left off</span>
          <LayoutGrid className="w-4 h-4 cursor-pointer hover:text-white" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {SYSTEM_FILES.map(file => (
            <div key={file.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-4 hover:bg-white/10 cursor-pointer transition">
              <div className={`p-3 rounded-xl ${file.type === 'installer' ? 'bg-blue-900/40 text-blue-400' : file.type === 'image' ? 'bg-purple-900/40 text-purple-400' : 'bg-gray-800 text-gray-400'}`}>
                <FileText className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <div className="font-medium text-sm truncate">{file.name}</div>
                <div className="text-gray-500 text-[10px] mt-1">Edited {file.lastEdited}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-5 gap-y-10 gap-x-4">
        {DESKTOP_APPS.map(app => (
          <div 
            key={app.id} 
            onClick={() => onSelect(app.id as AppType)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-full ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-transform duration-200`}>
              {app.icon}
            </div>
            <span className="mt-3 text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Launcher;
