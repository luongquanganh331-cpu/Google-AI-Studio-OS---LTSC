
import React from 'react';
import { AppType } from '../types';
import Launcher from './Launcher';
import Dock from './Dock';
import SystemTray from './SystemTray';

interface Props {
  openApp: (app: AppType) => void;
  activeApps: AppType[];
  closeApp: (app: AppType) => void;
  isLauncherOpen: boolean;
  setIsLauncherOpen: (open: boolean) => void;
}

const Desktop: React.FC<Props> = ({ openApp, activeApps, closeApp, isLauncherOpen, setIsLauncherOpen }) => {
  return (
    <div className="flex-1 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Launcher UI Overlay */}
      {isLauncherOpen && (
        <div 
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsLauncherOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Launcher onSelect={openApp} />
          </div>
        </div>
      )}

      {/* Taskbar / Dock Area */}
      <div className="absolute bottom-0 w-full h-12 flex items-center px-4 bg-black/50 backdrop-blur-md border-t border-white/10 z-[100]">
        <button 
          onClick={() => setIsLauncherOpen(!isLauncherOpen)}
          className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white/10 transition mr-4"
        >
          <div className="w-3 h-3 rounded-full bg-white opacity-80" />
        </button>

        <div className="flex-1 flex justify-center">
          <Dock activeApps={activeApps} openApp={openApp} />
        </div>

        <SystemTray />
      </div>
    </div>
  );
};

export default Desktop;
