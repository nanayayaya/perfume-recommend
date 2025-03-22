import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  initI18n, 
  setLocale as setI18nLocale, 
  getLocale, 
  detectBrowserLanguage, 
  loadLocaleMessages 
} from './i18n';

// 定义上下文类型
interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => Promise<boolean>;
  isLoading: boolean;
  supportedLocales: string[];
}

// 创建上下文
const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: async () => false,
  isLoading: true,
  supportedLocales: ['en', 'fr']
});

// 提供者属性类型
interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: string;
  supportedLocales?: string[];
}

/**
 * 多语言提供者组件，管理应用的语言状态
 */
export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  defaultLocale = 'en',
  supportedLocales = ['en', 'fr']
}) => {
  const [locale, setLocaleState] = useState<string>(defaultLocale);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  // 初始化
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      
      // 检测浏览器首选语言，如果支持则使用它
      let detectedLocale = detectBrowserLanguage();
      if (!supportedLocales.includes(detectedLocale)) {
        detectedLocale = defaultLocale;
      }
      
      // 加载默认语言和检测到的语言
      try {
        const defaultMessages = await loadLocaleMessages(
          defaultLocale, 
          `/locales/${defaultLocale}/questionnaire.json`
        );
        
        // 如果检测到的语言不是默认语言，则也加载它
        if (detectedLocale !== defaultLocale) {
          await loadLocaleMessages(
            detectedLocale, 
            `/locales/${detectedLocale}/questionnaire.json`
          );
        }
        
        // 初始化i18n
        initI18n(detectedLocale, { [defaultLocale]: defaultMessages });
        setLocaleState(detectedLocale);
        setInitialized(true);
      } catch (error) {
        console.error('初始化国际化失败:', error);
        // 出错时使用默认语言
        setLocaleState(defaultLocale);
      }
      
      setIsLoading(false);
    };
    
    initialize();
  }, [defaultLocale]);

  // 切换语言的方法
  const changeLocale = async (newLocale: string): Promise<boolean> => {
    if (!supportedLocales.includes(newLocale)) {
      console.warn(`不支持的语言: ${newLocale}`);
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // 如果语言文件尚未加载，则加载它
      await loadLocaleMessages(
        newLocale, 
        `/locales/${newLocale}/questionnaire.json`
      );
      
      // 设置新语言
      const success = setI18nLocale(newLocale);
      if (success) {
        setLocaleState(newLocale);
      }
      
      setIsLoading(false);
      return success;
    } catch (error) {
      console.error(`加载语言 "${newLocale}" 失败:`, error);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <LocaleContext.Provider 
      value={{
        locale,
        setLocale: changeLocale,
        isLoading,
        supportedLocales
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

/**
 * 使用语言上下文的Hook
 */
export const useLocale = () => useContext(LocaleContext);

export default LocaleProvider; 