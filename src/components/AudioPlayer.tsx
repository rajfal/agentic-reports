import React, { useEffect, useRef, useState } from 'react';
import { Music, Pause } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  isDisabled: boolean;
  onPlayingChange: (isPlaying: boolean) => void;
}

export function AudioPlayer({ audioUrl, isDisabled, onPlayingChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('ended', handleAudioEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnd);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (isDisabled && isPlaying) {
      handlePause();
    }
  }, [isDisabled]);

  const handleAudioEnd = () => {
    setIsPlaying(false);
    onPlayingChange(false);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        onPlayingChange(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
        onPlayingChange(false);
      });
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPlayingChange(false);
    }
  };

  const toggleAudio = () => {
    if (isDisabled) return;
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <button 
      onClick={toggleAudio}
      className={`border border-gray-500 hover:border-gray-400 px-8 py-3 rounded-full font-medium transition-colors flex items-center ${
        isPlaying ? 'bg-blue-500' : ''
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isDisabled}
    >
      {isPlaying ? (
        <>Pause Audio <Pause className="ml-2 w-5 h-5" /></>
      ) : (
        <>Listen to Audio <Music className="ml-2 w-5 h-5" /></>
      )}
    </button>
  );
}