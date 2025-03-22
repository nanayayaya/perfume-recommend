# Perfume Recommend

一个个性化香水推荐网站，基于用户的文化和美学偏好提供香水推荐。

## 项目概览

Perfume Recommend是一个互动问卷网站，通过分析用户对电影、音乐、艺术、饮食、神秘元素、旅行目的地和时代的偏好，为用户推荐最适合其个性和喜好的香水。

这个项目使用了现代前端技术和机器学习模型，结合了美学设计和数据分析，为用户提供个性化体验。

## 功能

- 互动式问卷，包含7个独特的问题，每个问题有4个选项
- 基于用户回答的精确香水推荐系统
- 支持英语和法语的多语言界面
- 响应式设计，适配各种设备尺寸
- 直观的用户界面，参考Apple设计美学
- 动画效果增强用户体验
- 机器学习模型辅助的推荐引擎

## 技术架构

### 前端

- React.js框架
- TypeScript类型安全
- 响应式CSS设计
- 动画和交互效果
- 国际化(i18n)支持

### 后端

- 推荐规则引擎
- XGBoost机器学习模型
- JSON数据存储

## 项目结构

```
perfume-recommend/
├── frontend/            # 前端代码
│   ├── components/      # React组件
│   └── utils/           # 工具函数
├── backend/             # 后端代码
│   └── recommendation/  # 推荐系统
│       └── ml_model/    # 机器学习模型
├── locales/             # 多语言文件
│   ├── en/              # 英语
│   └── fr/              # 法语
└── public/              # 公共资源
```

## 多语言支持

网站支持以下语言：

- 英语（默认）
- 法语

通过右上角的语言切换器可以轻松切换语言。系统会自动检测用户浏览器的首选语言，并在首次加载时应用。

## 数据处理

用户数据在本地处理，不会发送到任何外部服务器：

1. 问卷回答在客户端收集
2. 使用规则引擎和机器学习模型在前端进行处理
3. 生成个性化推荐
4. 用户可以保存或分享自己的推荐结果

## 如何运行

### 开发环境

1. 确保安装了Node.js (v14+)
2. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/perfume-recommend.git
   cd perfume-recommend
   ```
3. 安装依赖
   ```bash
   npm install
   ```
4. 启动开发服务器
   ```bash
   npm start
   ```
5. 浏览器将自动打开 http://localhost:3000

### 生产部署

1. 构建生产版本
   ```bash
   npm run build
   ```
2. 部署`build`文件夹中的内容到您的网站服务器

## 贡献

欢迎提供问题报告、功能请求和拉取请求。请确保更新测试以适应您的更改。

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)

## 联系方式

如有问题或建议，请联系：contact@perfumerecommend.life