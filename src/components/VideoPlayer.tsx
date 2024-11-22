import React from 'react';
import { X, PlayCircle, PauseCircle } from 'lucide-react';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayer({ isOpen, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const togglePlayPause = () => {
    if (iframeRef.current) {
      const message = isPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
      iframeRef.current.contentWindow?.postMessage(message, '*');
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
      <div className="mt-8 max-w-4xl mx-auto bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold">Watch Our Demo</h3>
            <button
              onClick={togglePlayPause}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isPlaying ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
            </button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            ref={iframeRef}
            className="w-full h-[400px] rounded-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
            title="Product Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}