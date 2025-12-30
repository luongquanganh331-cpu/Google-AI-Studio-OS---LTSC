
import React, { useRef, useEffect, useState } from 'react';
import { X, Minus, Square, Camera, RefreshCw, Circle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const CameraWindow: React.FC<Props> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('Camera access denied or not found');
      }
    }

    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="app-window absolute top-16 left-1/2 -translate-x-1/2 w-[800px] h-[600px] glass rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/20">
      <div className="h-10 bg-black/40 flex items-center px-4 justify-between select-none">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-gray-300">Studio Camera</span>
        </div>
        <div className="flex items-center gap-3">
          <Minus className="w-4 h-4 text-gray-500" />
          <Square className="w-3 h-3 text-gray-500" />
          <X className="w-4 h-4 text-gray-500 hover:text-red-400 cursor-pointer" onClick={onClose} />
        </div>
      </div>

      <div className="flex-1 bg-black relative flex items-center justify-center">
        {error ? (
          <div className="text-center">
            <Camera className="w-16 h-16 text-gray-800 mx-auto mb-4" />
            <p className="text-gray-500">{error}</p>
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale opacity-80" />
        )}

        {/* Camera Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[40px] border-black/10 flex items-center justify-center">
          <div className="w-full h-full border border-white/5 border-dashed rounded-lg" />
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 px-8 py-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
          <RefreshCw className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
          <button className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center hover:scale-110 active:scale-90 transition">
            <div className="w-8 h-8 bg-red-600 rounded-full" />
          </button>
          <Circle className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default CameraWindow;
