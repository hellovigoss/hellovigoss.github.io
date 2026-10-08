# 找联系方式使用指南页

这是一个不依赖构建工具的静态网站，不需要 Node.js 或其他运行时。
当前说明对应扩展 `1.0.0`。

## 本地预览

可直接打开 `index.html`，或在当前目录启动任意静态文件服务。

## 部署

将本目录下的文件发布到 GitHub Pages 即可。仓库里的
`.github/workflows/pages.yml` 会在推送到 `main` 或 `master` 时发布本目录。
在 GitHub 仓库的 Settings → Pages 中，把 Source 选成 GitHub Actions。

也可以把本目录原样上传到其他静态托管，入口是 `index.html`。
`contact-finder-guide-site.zip` 是同一份网站的部署包，由仓库根目录的
`npm run pack` 生成。

页面内的「下载扩展」按钮会读取：

`downloads/contact-finder-extension.zip`

更新扩展后，在仓库根目录运行 `npm run pack`，再重新发布。

首屏是 demo。设置页的卡片是示意。
