import React, { useState, useEffect } from 'react';

interface LanguageSwitcherProps {
  onChange: (locale: string) => void;
  currentLocale: string;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  onChange, 
  currentLocale, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currentLocale);
  
  useEffect(() => {
    setSelected(currentLocale);
  }, [currentLocale]);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];
  
  const handleSelect = (code: string) => {
    setSelected(code);
    onChange(code);
    setIsOpen(false);
  };
  
  const selectedLanguage = languages.find(lang => lang.code === selected) || languages[0];
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 text-sm bg-white rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <span className="mr-2 text-lg">{selectedLanguage.flag}</span>
          <span className="font-medium">{selectedLanguage.name}</span>
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="language-switcher"
          aria-activedescendant={`language-${selected}`}
        >
          {languages.map((language) => (
            <li
              key={language.code}
              id={`language-${language.code}`}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                selected === language.code
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'text-gray-900'
              } hover:bg-indigo-50`}
              role="option"
              aria-selected={selected === language.code}
              onClick={() => handleSelect(language.code)}
            >
              <div className="flex items-center">
                <span className="mr-2 text-lg">{language.flag}</span>
                <span
                  className={`font-medium block truncate ${
                    selected === language.code ? 'font-semibold' : 'font-normal'
                  }`}
                >
                  {language.name}
                </span>
              </div>
              
              {selected === language.code && (
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher; 