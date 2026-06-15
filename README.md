# 工位小憩

面向久坐办公人群的微信小程序。当前版本已经搭好原生小程序骨架，并按 `image.png` 的视觉方向实现首页、数据页、设置页、我的页的 mock UI。

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

## 文档

- 接口文档：[docs/api.md](docs/api.md)
- 视觉参考：`image.png`
