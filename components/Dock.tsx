
import React from 'react';
import { AppType } from '../types';
import { DESKTOP_APPS } from '../constants';

interface Props {
  activeApps: AppType[];
  openApp: (app: AppType) => void;
}

const Dock: React.FC<Props> = ({ activeApps, openApp }) => {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 glass rounded-2xl border border-white/10 mb-2">
      {DESKTOP_APPS.map(app => {
        const isActive = activeApps.includes(app.id as AppType);
        return (
          <div key={app.id} className="relative group">
            <button
              onClick={() => openApp(app.id as AppType)}
              className={`p-2 rounded-xl transition-all duration-200 hover:bg-white/10 hover:-translate-y-1 active:scale-90 ${isActive ? 'bg-white/10' : ''}`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {app.icon}
              </div>
            </button>
            {isActive && (
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
            )}
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition shadow-xl border border-white/10">
              {app.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Dock;
