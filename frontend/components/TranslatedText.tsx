import React, { useEffect, useState } from 'react';
import { t, getLocale, onLocaleChange } from '../utils/i18n';

interface TranslatedTextProps {
  i18nKey: string;
  params?: Record<string, any>;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * 用于显示翻译文本的组件，自动响应语言变更
 * @param i18nKey 翻译文本的键
 * @param params 可选的参数对象，用于替换翻译文本中的占位符
 * @param className 可选的CSS类名
 * @param as 要渲染的HTML元素，默认为span
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({
  i18nKey,
  params,
  className = '',
  as: Component = 'span'
}) => {
  const [locale, setLocale] = useState(getLocale());
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    // 更新翻译文本
    setTranslatedText(t(i18nKey, params));
    
    // 当语言变更时更新组件
    const cleanup = onLocaleChange((newLocale) => {
      setLocale(newLocale);
      setTranslatedText(t(i18nKey, params));
    });
    
    return cleanup;
  }, [i18nKey, params]);

  // 确保在第一次加载时设置正确的文本
  useEffect(() => {
    setTranslatedText(t(i18nKey, params));
  }, []);

  // 根据提供的Component动态渲染元素
  return React.createElement(
    Component,
    { className },
    translatedText
  );
};

export default TranslatedText; 