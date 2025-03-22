import React, { useState, useEffect } from 'react';

interface MovieOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  notes: string[];
  complexity: number;
}

interface MovieSelectorProps {
  onSelect: (selection: MovieOption) => void;
  className?: string;
}

const MovieSelector: React.FC<MovieSelectorProps> = ({ onSelect, className = '' }) => {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const movieOptions: MovieOption[] = [
    {
      id: 'grand_budapest',
      emoji: '🎩',
      title: 'The Grand Budapest Hotel',
      description: 'Symmetrical aesthetics → Vintage pink pepper + iris, elegant and intellectual',
      notes: ['pink_pepper', 'iris'],
      complexity: 3
    },
    {
      id: 'blade_runner',
      emoji: '🌌',
      title: 'Blade Runner 2049',
      description: 'Cyberpunk → Metallic patchouli + electronic smoke notes',
      notes: ['patchouli', 'electronic_smoke'],
      complexity: 5
    },
    {
      id: 'alice',
      emoji: '🍄',
      title: 'Alice in Wonderland',
      description: 'Fantasy adventure → Psychedelic mushroom + berry gourmand notes',
      notes: ['mushroom', 'berry'],
      complexity: 4
    },
    {
      id: 'legend_1900',
      emoji: '🎻',
      title: 'The Legend of 1900',
      description: 'Classical romance → Sea salt + vintage cedarwood',
      notes: ['sea_salt', 'cedarwood'],
      complexity: 2
    }
  ];

  useEffect(() => {
    // 为电影卡片添加粒子效果
    if (typeof window !== 'undefined' && selectedMovie) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedMovie]);

  const handleSelect = (movie: MovieOption) => {
    setSelectedMovie(movie.id);
    
    // 短暂延迟以显示选中状态的动画
    setTimeout(() => {
      onSelect(movie);
    }, 500);
  };

  return (
    <div className={`movie-selector ${className}`}>
      <h3 className="text-2xl font-semibold mb-6">Film Aesthetics</h3>
      <p className="text-xl mb-8">Which film's visual world would you most like to live in?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movieOptions.map((movie) => (
          <button
            key={movie.id}
            onClick={() => handleSelect(movie)}
            className={`option-card bg-apple-gray-100 dark:bg-apple-gray-800 p-6 rounded-xl hover:shadow-md transition-all text-left flex items-start ${
              selectedMovie === movie.id ? 'selected' : ''
            } ${isAnimating && selectedMovie === movie.id ? 'animate-pulse' : ''}`}
          >
            <span className="text-3xl mr-4">{movie.emoji}</span>
            <div>
              <h4 className="font-semibold mb-1">{movie.title}</h4>
              <p className="text-apple-gray-700 dark:text-apple-gray-300">{movie.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieSelector; 