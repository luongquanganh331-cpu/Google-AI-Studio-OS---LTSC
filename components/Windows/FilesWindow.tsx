
import React from 'react';
import { X, Minus, Square, Folder, FileText, ImageIcon, Search, ChevronRight } from 'lucide-react';
import { SYSTEM_FILES } from '../../constants';

interface Props {
  onClose: () => void;
}

const FilesWindow: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="app-window absolute top-20 left-20 right-20 bottom-32 glass rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/20">
      <div className="h-10 bg-black/40 flex items-center px-4 justify-between select-none">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-medium text-gray-300">File Explorer</span>
        </div>
        <div className="flex items-center gap-3">
          <Minus className="w-4 h-4 text-gray-500" />
          <Square className="w-3 h-3 text-gray-500" />
          <X className="w-4 h-4 text-gray-500 hover:text-red-400 cursor-pointer" onClick={onClose} />
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 bg-black/20 border-r border-white/5 p-4 space-y-6">
          <div className="space-y-1">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold px-2 mb-2">Library</div>
            {['Documents', 'Images', 'Downloads', 'Desktop'].map(item => (
              <div key={item} className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-sm text-gray-400 hover:text-white transition">
                <ChevronRight className="w-3 h-3 text-gray-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold px-2 mb-2">Devices</div>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              OS_LTSC (C:)
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-white/2">
          <div className="p-4 flex items-center gap-4">
            <div className="flex-1 h-9 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 gap-2 text-sm text-gray-400">
              <Search className="w-4 h-4" />
              <input type="text" placeholder="Search Files..." className="bg-transparent border-none outline-none w-full" />
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-4 lg:grid-cols-6 gap-6">
            {SYSTEM_FILES.map(file => (
              <div key={file.id} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95 ${file.type === 'image' ? 'bg-purple-600/20 text-purple-400' : 'bg-gray-700/20 text-gray-400'}`}>
                  {file.type === 'image' ? <ImageIcon className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                </div>
                <span className="mt-2 text-xs text-gray-400 text-center truncate w-24 group-hover:text-white">{file.name}</span>
                <span className="text-[8px] text-gray-600">{file.lastEdited}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesWindow;
