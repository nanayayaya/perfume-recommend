/**
 * i18n.ts
 * 为 perfumerecommend.life 提供多语言支持的工具
 */

type NestedObject = {
  [key: string]: string | NestedObject;
};

type LocaleMessages = Record<string, NestedObject>;

let currentLocale = 'en';
let messages: LocaleMessages = {};

/**
 * 初始化国际化配置
 * @param locale 当前语言代码
 * @param localeMessages 所有可用语言的消息
 */
export function initI18n(locale: string, localeMessages: LocaleMessages) {
  currentLocale = locale;
  messages = localeMessages;
}

/**
 * 切换当前语言
 * @param locale 新的语言代码
 * @returns 是否切换成功
 */
export function setLocale(locale: string): boolean {
  if (messages[locale]) {
    currentLocale = locale;
    // 触发自定义事件，通知应用语言已更改
    const event = new CustomEvent('localeChanged', { detail: { locale } });
    window.dispatchEvent(event);
    
    // 将当前语言保存到本地存储
    try {
      localStorage.setItem('perfume_recommend_locale', locale);
    } catch (e) {
      console.warn('无法将语言首选项保存到本地存储:', e);
    }
    
    return true;
  }
  return false;
}

/**
 * 获取当前语言代码
 * @returns 当前语言代码
 */
export function getLocale(): string {
  return currentLocale;
}

/**
 * 从浏览器获取首选语言
 * @returns 检测到的首选语言代码
 */
export function detectBrowserLanguage(): string {
  // 首先尝试从localStorage获取
  try {
    const savedLocale = localStorage.getItem('perfume_recommend_locale');
    if (savedLocale && messages[savedLocale]) {
      return savedLocale;
    }
  } catch (e) {
    console.warn('无法从本地存储读取语言首选项:', e);
  }
  
  // 然后尝试从浏览器语言设置获取
  const browserLang = navigator.language.split('-')[0];
  if (messages[browserLang]) {
    return browserLang;
  }
  
  // 如果都没有匹配项，则返回默认值
  return 'en';
}

/**
 * 获取嵌套路径的消息
 * @param obj 嵌套对象
 * @param path 点分隔的路径，如 "quiz.title"
 * @returns 找到的消息或者路径
 */
function getNestedValue(obj: NestedObject, path: string): string {
  const parts = path.split('.');
  let current: any = obj;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      return path;
    }
    current = current[part];
  }
  
  return typeof current === 'string' ? current : path;
}

/**
 * 将消息中的动态参数替换为值
 * @param message 原始消息
 * @param params 参数对象，如 { name: "John" }
 * @returns 替换后的消息
 */
function replaceParams(message: string, params?: Record<string, any>): string {
  if (!params) return message;
  
  let result = message;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), String(value));
  }
  
  return result;
}

/**
 * 翻译消息
 * @param key 消息键，如 "quiz.title"
 * @param params 可选，动态参数，如 { name: "John" }
 * @returns 翻译后的消息
 */
export function t(key: string, params?: Record<string, any>): string {
  if (!messages[currentLocale]) {
    console.warn(`没有找到语言 "${currentLocale}" 的翻译`);
    return key;
  }
  
  const message = getNestedValue(messages[currentLocale], key);
  return replaceParams(message, params);
}

/**
 * 异步加载语言文件
 * @param locale 语言代码
 * @param path 语言文件路径
 * @returns Promise 解析为加载的消息
 */
export async function loadLocaleMessages(locale: string, path: string): Promise<NestedObject> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    messages[locale] = data;
    return data;
  } catch (e) {
    console.error(`加载语言 "${locale}" 失败:`, e);
    throw e;
  }
}

/**
 * Hook 用于响应语言变更
 * @param callback 语言变更时调用的回调
 */
export function onLocaleChange(callback: (locale: string) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent;
    callback(customEvent.detail.locale);
  };
  
  window.addEventListener('localeChanged', handler);
  
  // 返回清理函数
  return () => {
    window.removeEventListener('localeChanged', handler);
  };
}

// 默认导出所有功能
export default {
  initI18n,
  setLocale,
  getLocale,
  detectBrowserLanguage,
  t,
  loadLocaleMessages,
  onLocaleChange
}; 