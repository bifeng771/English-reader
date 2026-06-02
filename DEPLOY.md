# LinguaReader 长期部署

这个目录是纯静态网页，可以长期部署到 Netlify、Vercel、Cloudflare Pages、GitHub Pages 或任意 HTTPS 静态服务器。部署后手机打开同一个公网地址即可使用，也可以添加到主屏幕作为 PWA。

## 推荐方式

1. Netlify：把本目录拖到 Netlify Drop，或连接仓库后把发布目录设置为当前目录。
2. Vercel：导入本目录所在仓库，Framework Preset 选择 Other，Output Directory 留空或设为当前目录。
3. Cloudflare Pages：连接仓库，Build command 留空，Build output directory 设置为当前目录。
4. GitHub Pages：把本目录内容放到仓库根目录或 `docs/`，开启 Pages；`.nojekyll` 已包含。

## 已优化内容

- `sw.js` 使用 v24 缓存，HTML 网络优先，静态资源离线可用。
- `manifest.json` 支持手机安装到主屏幕。
- `netlify.toml`、`vercel.json`、`_headers`、`_redirects` 已配置缓存、安全响应头和单页回退。
- 所有资料都在浏览器本地保存；换手机或清理浏览器数据后需要重新导入文件。

## 注意

长期公网地址必须由托管平台提供 HTTPS 域名。静态站点本身不包含账号登录和云同步；如果需要账号、跨设备同步书架和阅读进度，需要增加后端数据库与用户系统。

本地测试时，手机不能打开 `http://localhost:4179/`，因为这会指向手机本机。请使用启动服务后终端显示的 `Mobile/LAN URLs`，或直接部署到 HTTPS 静态托管平台。
