
import React, { useState, useEffect, useCallback } from 'react';
import { OSState, AppType } from './types';
import BootScreen from './components/BootScreen';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';
import BrowserWindow from './components/Windows/BrowserWindow';
import FilesWindow from './components/Windows/FilesWindow';
import CameraWindow from './components/Windows/CameraWindow';
import SettingsWindow from './components/Windows/SettingsWindow';

const App: React.FC = () => {
  const [osState, setOsState] = useState<OSState>('BOOT');
  const [activeApps, setActiveApps] = useState<AppType[]>([]);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOsState('LOCK');
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = useCallback(() => {
    setOsState('DESKTOP');
  }, []);

  const openApp = useCallback((app: AppType) => {
    if (!activeApps.includes(app)) {
      setActiveApps(prev => [...prev, app]);
    }
    setIsLauncherOpen(false);
  }, [activeApps]);

  const closeApp = useCallback((app: AppType) => {
    setActiveApps(prev => prev.filter(a => a !== app));
  }, []);

  if (osState === 'BOOT') return <BootScreen />;
  if (osState === 'LOCK') return <LockScreen onLogin={handleLogin} />;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
      {/* Desktop Layer */}
      <Desktop 
        openApp={openApp} 
        activeApps={activeApps} 
        closeApp={closeApp} 
        isLauncherOpen={isLauncherOpen}
        setIsLauncherOpen={setIsLauncherOpen}
      />

      {/* Windows Layer */}
      {activeApps.includes(AppType.BROWSER) && <BrowserWindow onClose={() => closeApp(AppType.BROWSER)} />}
      {activeApps.includes(AppType.FILES) && <FilesWindow onClose={() => closeApp(AppType.FILES)} />}
      {activeApps.includes(AppType.CAMERA) && <CameraWindow onClose={() => closeApp(AppType.CAMERA)} />}
      {activeApps.includes(AppType.SETTINGS) && <SettingsWindow onClose={() => closeApp(AppType.SETTINGS)} />}
    </div>
  );
};

export default App;
