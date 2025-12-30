
import React, { useState, useEffect } from 'react';
import { 
  X, Minus, Square, Settings, Wifi, Bluetooth, Info, 
  User, Shield, Cpu, HardDrive, Layout, ChevronRight, ToggleLeft, ToggleRight,
  Globe, Bell, Lock, HelpCircle, Activity, Zap
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

type SettingsTab = 'connectivity' | 'performance' | 'account' | 'about';

const SettingsWindow: React.FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('performance');
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [load, setLoad] = useState({ cpu: 12, ram: 45 });

  // Simulate real-time performance metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setLoad({
        cpu: Math.floor(Math.random() * 15) + 5,
        ram: Math.floor(Math.random() * 5) + 42
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sidebarItems = [
    { id: 'performance', label: 'Performance', icon: <Activity className="w-4 h-4" /> },
    { id: 'connectivity', label: 'Connectivity', icon: <Wifi className="w-4 h-4" /> },
    { id: 'account', label: 'Account', icon: <User className="w-4 h-4" /> },
    { id: 'about', label: 'About OS', icon: <Info className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'connectivity':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${wifiEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-500'}`}>
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Wi-Fi Network</h3>
                    <p className="text-xs text-gray-500">{wifiEnabled ? 'Connected to Neural_Net_5G' : 'Disconnected'}</p>
                  </div>
                </div>
                <button onClick={() => setWifiEnabled(!wifiEnabled)}>
                  {wifiEnabled ? <ToggleRight className="w-10 h-10 text-blue-500" /> : <ToggleLeft className="w-10 h-10 text-gray-600" />}
                </button>
              </div>

              <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${bluetoothEnabled ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-800 text-gray-500'}`}>
                    <Bluetooth className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Bluetooth</h3>
                    <p className="text-xs text-gray-500">{bluetoothEnabled ? 'Searching for devices...' : 'Switched off'}</p>
                  </div>
                </div>
                <button onClick={() => setBluetoothEnabled(!bluetoothEnabled)}>
                  {bluetoothEnabled ? <ToggleRight className="w-10 h-10 text-indigo-500" /> : <ToggleLeft className="w-10 h-10 text-gray-600" />}
                </button>
              </div>
            </div>

            {wifiEnabled && (
              <div className="space-y-2 mt-8">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold px-4 mb-4">Nearby Studio Nodes</p>
                {['Neural_Net_5G', 'Studio_Guest_Secure', 'Google_Mainframe'].map(net => (
                  <div key={net} className="flex items-center justify-between px-6 py-4 hover:bg-white/5 rounded-2xl cursor-pointer group transition border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-4">
                      <Wifi className="w-4 h-4 text-gray-600 group-hover:text-blue-400" />
                      <span className="text-sm text-gray-300 font-medium">{net}</span>
                    </div>
                    {net === 'Neural_Net_5G' ? (
                       <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                         <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active</span>
                       </div>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-gray-700" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                  <Cpu className="w-20 h-20" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Processor (CPU)</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">Neural Core v3</div>
                <div className="text-xs text-gray-400 mb-6">Google AI-Engine Optimized</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                    <span>Usage</span>
                    <span className="text-blue-400">{load.cpu}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${load.cpu}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                  <Zap className="w-20 h-20" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Memory (RAM)</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">32GB LPDDR5x</div>
                <div className="text-xs text-gray-400 mb-6">Unified Memory Architecture</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                    <span>Load</span>
                    <span className="text-purple-400">{load.ram}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: `${load.ram}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <HardDrive className="w-5 h-5 text-green-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">NVMe Storage Flash</h3>
                  <p className="text-xs text-gray-500">256GB / 1TB Used</p>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-green-500" style={{ width: '25%' }} />
                <div className="h-full bg-blue-500/30" style={{ width: '15%' }} />
              </div>
              <div className="mt-4 flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">System Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500/30" />
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">AI Models</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-8 bg-gradient-to-br from-blue-600/20 via-black to-purple-600/20 rounded-[2.5rem] border border-white/10 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-3xl font-bold text-white">
                    A
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-4 border-black flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">anhdaynekkkk</h2>
              <p className="text-sm text-gray-500 mb-6">root@studio-ltsc-node-01</p>
              
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition">Manage Profile</button>
                <button className="px-6 py-2 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-full hover:bg-white/10 transition">Sign Out</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
               {[
                 { label: 'Login & Security', desc: 'Manage password and biometric access', icon: <Lock className="w-4 h-4" /> },
                 { label: 'Privacy Settings', desc: 'Control neural data collection', icon: <Shield className="w-4 h-4" /> },
                 { label: 'Notifications', desc: 'Configure system alerts', icon: <Bell className="w-4 h-4" /> },
               ].map(item => (
                 <div key={item.label} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl cursor-pointer group transition">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-300">{item.label}</div>
                        <div className="text-[10px] text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-800 group-hover:text-gray-400" />
                 </div>
               ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-black rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl relative">
                   <div className="absolute inset-2 border border-blue-500/20 rounded-2xl animate-pulse" />
                   <Globe className="w-10 h-10 text-blue-500" />
                </div>
                <div>
                   <h1 className="text-3xl font-light text-white tracking-tight">Google AI Studio</h1>
                   <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.4em]">OS v2.5 LTSC-FLASH</p>
                </div>
             </div>
             
             <div className="space-y-4">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest px-1">Software Specifications</p>
                <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                   {[
                     { k: 'Version', v: '2025.04.12-FLASH' },
                     { k: 'Channel', v: 'Long-Term Service Branch (LTSC)' },
                     { k: 'Kernel', v: 'LTSC-RT-6.1.0-AI-Unified' },
                     { k: 'Build Status', v: 'Certified Stable' },
                   ].map((row, i) => (
                     <div key={row.k} className={`flex justify-between px-6 py-4 text-xs ${i !== 3 ? 'border-b border-white/5' : ''}`}>
                       <span className="text-gray-500">{row.k}</span>
                       <span className="text-gray-200 font-medium">{row.v}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10 text-center">
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "Engineered for high-performance AI workloads and zero-latency studio environments. 
                  Minimalist by design. Powerful by nature."
                </p>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="app-window absolute top-10 left-1/2 -translate-x-1/2 w-[980px] h-[700px] glass rounded-[3rem] flex flex-col overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/20 z-50">
      {/* Integrated Header */}
      <div className="h-14 flex items-center px-8 justify-between select-none border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-white uppercase tracking-widest">System Preferences</span>
            <span className="text-[9px] text-gray-500 uppercase tracking-tighter">v2.5 LTSC • Node Online</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white/5 transition"><Minus className="w-4 h-4" /></button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white/5 transition"><Square className="w-3.5 h-3.5" /></button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-500/20 hover:text-red-400 transition" onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Modern Sidebar Navigation */}
        <div className="w-72 border-r border-white/5 p-6 flex flex-col gap-2 bg-black/40">
          <div className="mb-8 px-2">
            <div className="flex items-center gap-2 mb-1">
               <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
               <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Administrator</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
          </div>
          
          <div className="flex flex-col gap-2">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as SettingsTab)}
                className={`flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all duration-300 group relative ${activeTab === item.id ? 'bg-white/10 text-white border border-white/10' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300 border border-transparent'}`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-500 rounded-r-full shadow-[4px_0_12px_rgba(59,130,246,0.5)]" />
                )}
                <div className={`${activeTab === item.id ? 'text-blue-400' : 'group-hover:text-blue-400'} transition-colors`}>
                  {item.icon}
                </div>
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-auto">
             <div className="p-5 bg-gradient-to-br from-white/5 to-transparent rounded-3xl border border-white/10">
                <p className="text-[10px] text-gray-600 uppercase font-bold mb-3 tracking-widest">System Health</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-400">Integrity</span>
                  <span className="text-[10px] text-green-500 font-bold">100%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full" />
                </div>
             </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-12 bg-white/[0.01]">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
               <div className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em] mb-2 px-1">Configuration</div>
               <h2 className="text-4xl font-bold text-white tracking-tighter">
                {sidebarItems.find(i => i.id === activeTab)?.label}
              </h2>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
