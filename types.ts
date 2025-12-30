
export enum AppType {
  BROWSER = 'BROWSER',
  FILES = 'FILES',
  CAMERA = 'CAMERA',
  SETTINGS = 'SETTINGS'
}

export interface OSFile {
  id: string;
  name: string;
  type: 'image' | 'config' | 'installer' | 'folder';
  lastEdited: string;
  icon?: string;
}

export type OSState = 'BOOT' | 'LOCK' | 'DESKTOP';
