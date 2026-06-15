# 工位小憩

面向久坐办公人群的微信小程序骨架，当前阶段包含首页、数据、设置、我的四个 tab 页，以及微信云开发服务层和云函数占位。

## 技术栈

- 微信原生小程序
- TypeScript
- 微信云开发

## 本地开发

```bash
npm install
npm run typecheck
```

使用微信开发者工具导入当前目录即可打开项目。首次接入真实小程序时，需要替换 `project.config.json` 中的 `appid`，并在 `services/cloud.ts` 配置云开发环境。
