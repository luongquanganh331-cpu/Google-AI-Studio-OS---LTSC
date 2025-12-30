
import React from 'react';
import { Globe, Folder, Camera, Settings } from 'lucide-react';
import { AppType, OSFile } from './types';

export const SYSTEM_FILES: OSFile[] = [
  { id: '1', name: 'Gemini-Setup.dmg', type: 'installer', lastEdited: '10:51 AM' },
  { id: '2', name: 'OS_Services.conf', type: 'config', lastEdited: '11:35 AM' },
  { id: '3', name: 'wallpaper_preview.png', type: 'image', lastEdited: '11:32 AM' },
];

export const DESKTOP_APPS = [
  { id: AppType.BROWSER, name: 'Browser', icon: <Globe className="w-8 h-8 text-blue-400" />, color: 'bg-blue-600' },
  { id: AppType.FILES, name: 'Files', icon: <Folder className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-600' },
  { id: AppType.CAMERA, name: 'Camera', icon: <Camera className="w-8 h-8 text-gray-400" />, color: 'bg-gray-600' },
  { id: AppType.SETTINGS, name: 'Settings', icon: <Settings className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-600' },
];
