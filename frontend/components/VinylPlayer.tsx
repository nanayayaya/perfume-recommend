import React, { useState, useRef, useEffect } from 'react';

interface MusicOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  notes: string[];
  intensity: number;
  audioSample?: string;
}

interface VinylPlayerProps {
  onSelect: (selection: MusicOption) => void;
  className?: string;
}

const VinylPlayer: React.FC<VinylPlayerProps> = ({ onSelect, className = '' }) => {
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const vinylRef = useRef<HTMLDivElement | null>(null);
  const rotationInterval = useRef<NodeJS.Timeout | null>(null);

  const musicOptions: MusicOption[] = [
    {
      id: 'jazz',
      emoji: '🎷',
      title: 'Jazz (Miles Davis)',
      description: '→ Whiskey + tobacco notes',
      notes: ['whiskey', 'tobacco'],
      intensity: 4,
      audioSample: '/audio/jazz-sample.mp3'
    },
    {
      id: 'rock',
      emoji: '🎸',
      title: 'Classic Rock (Queen)',
      description: '→ Leather + amber',
      notes: ['leather', 'amber'],
      intensity: 5,
      audioSample: '/audio/rock-sample.mp3'
    },
    {
      id: 'electronic',
      emoji: '🎹',
      title: 'Electronic Music (Daft Punk)',
      description: '→ Synthetic musk + ozone elements',
      notes: ['synthetic_musk', 'ozone'],
      intensity: 2,
      audioSample: '/audio/electronic-sample.mp3'
    },
    {
      id: 'classical',
      emoji: '🎻',
      title: 'Classical Music (Bach)',
      description: '→ Cashmere wood + old paper scent',
      notes: ['cashmere_wood', 'paper'],
      intensity: 3,
      audioSample: '/audio/classical-sample.mp3'
    }
  ];

  // 模拟唱片旋转
  useEffect(() => {
    if (isPlaying) {
      rotationInterval.current = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
    } else if (rotationInterval.current) {
      clearInterval(rotationInterval.current);
    }

    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, [isPlaying]);

  // 处理移动设备陀螺仪
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (isDragging && vinylRef.current && event.beta) {
        // 使用设备倾斜角度调整唱片位置
        const tilt = Math.min(Math.max(-30, event.beta - 45), 30);
        vinylRef.current.style.transform = `rotate(${rotation}deg) translateX(${tilt}px)`;
      }
    };

    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ 需要请求权限
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else if (window.DeviceOrientationEvent) {
      // 其他支持陀螺仪的设备
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [isDragging, rotation]);

  const handleSelect = (music: MusicOption) => {
    setSelectedMusic(music.id);
    setIsPlaying(true);
    
    // 播放音频示例
    if (audioRef.current && music.audioSample) {
      audioRef.current.src = music.audioSample;
      audioRef.current.play().catch(e => console.error('Audio playback failed:', e));
      
      // 5秒后停止并提交选择
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
        onSelect(music);
      }, 5000);
    } else {
      // 如果没有音频，直接提交
      setTimeout(() => {
        setIsPlaying(false);
        onSelect(music);
      }, 1000);
    }
  };

  const startDragging = () => {
    setIsDragging(true);
  };

  const stopDragging = () => {
    setIsDragging(false);
    if (vinylRef.current) {
      vinylRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  };

  return (
    <div className={`vinyl-player ${className}`}>
      <h3 className="text-2xl font-semibold mb-6">Music Personality</h3>
      <p className="text-xl mb-8">What's on your late-night playlist?</p>
      
      {/* 虚拟唱片机 */}
      <div className="vinyl-player-visual mb-12 relative mx-auto w-64 h-64">
        <div 
          ref={vinylRef}
          className="vinyl-record absolute w-full h-full rounded-full bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
          }}
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onTouchStart={startDragging}
          onTouchEnd={stopDragging}
        >
          <div className="vinyl-label w-1/3 h-1/3 rounded-full bg-apple-gray-200 flex items-center justify-center">
            {selectedMusic ? (
              <span className="text-2xl">{musicOptions.find(m => m.id === selectedMusic)?.emoji}</span>
            ) : (
              <span className="text-xs text-center text-apple-gray-700">Drag to play</span>
            )}
          </div>
        </div>
        
        <div className="tonearm absolute top-0 right-0 w-40 h-8 bg-apple-gray-300 rounded origin-right"
          style={{ 
            transform: `rotate(${selectedMusic ? '30deg' : '0deg'})`,
            transition: 'transform 1s ease',
            transformOrigin: 'right center',
            zIndex: 2
          }}
        >
          <div className="w-2 h-2 absolute left-4 top-3 rounded-full bg-apple-red"></div>
        </div>
      </div>
      
      {/* 音乐选项 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {musicOptions.map((music) => (
          <button
            key={music.id}
            onClick={() => handleSelect(music)}
            className={`option-card bg-apple-gray-100 dark:bg-apple-gray-800 p-6 rounded-xl hover:shadow-md transition-all text-left flex items-start ${
              selectedMusic === music.id ? 'selected playing' : ''
            }`}
          >
            <span className="text-3xl mr-4">{music.emoji}</span>
            <div>
              <h4 className="font-semibold mb-1">{music.title}</h4>
              <p className="text-apple-gray-700 dark:text-apple-gray-300">{music.description}</p>
              {selectedMusic === music.id && isPlaying && (
                <div className="mt-2 flex space-x-1">
                  <span className="w-1 h-4 bg-apple-blue animate-bounce"></span>
                  <span className="w-1 h-4 bg-apple-blue animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1 h-4 bg-apple-blue animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {/* 隐藏音频播放器 */}
      <audio ref={audioRef} className="hidden"></audio>
    </div>
  );
};

export default VinylPlayer; 