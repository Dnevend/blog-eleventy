---
layout: post-layout.njk
title: 使用Eleventy在GithubPages上部署博客站点
date: 2022-05-15
tags: ["post", "eleventy"]
recommend: true
---

<!-- Excerpt Start -->
无需服务器、数据库、域名，使用静态站点生成工具，折腾个人博客。
![alt 11ty](/imgs/11ty.jfif)
<!-- Excerpt End -->

---

### 什么是静态网站和静态网站生成器

- 静态网站：
  静态网页由 HTML，CSS 和可选的 Javascript 组成。该页面不必由服务器端编程语言按需生成。

- 静态网站生成器：
  静态 Web 页面生成器在本地计算机或云中生成完整的静态 Web 页面。然后，这些可以存储在服务器或内容分发网络（CDN）中。
  与内容管理系统类似，生成器提供了使用布局模板，分离内容和页面框架，在某些情况下甚至可以从外部 CMS 中提取内容。
- 本站点使用了[Eleventy](https://www.11ty.dev/){target="_blank" rel="noopener"}，常见的静态站点生成工具还有[Hugo](https://gohugo.io/)、[Hexo](https://hexo.io/)、[Next.js](https://nextjs.org/)及 Github 官方默认的[Jekyll](https://www.jekyll.com/)等等

### 静态生成博客站点的优势

- 当部署在 GithubPages 上，可直接通过域名[name].github.io 访问，节省域名费用成本
- 无需服务器和数据库，确保了站点的安全性
- 可以使用多种 HTML、MarkDown 等模板语言
- 文档可以通过 Git 进行版本管理
- 站点迁移方便

### 项目初始化

- 你可以通过参考 [这篇文章](https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/){target="_blank" rel="noopener"} 来完成站点的初始工作.

### 部署流程

- 你可以通过参考 [这篇文章](https://quinndombrowski.com/blog/2022/05/07/hosting-eleventy-on-github-pages/){target="_blank" rel="noopener"} 来完成将Eleventy项目托管发布在GithubPages上的工作.

> [**Github中的配置**](https://docs.github.com/cn/pages){target="_blank" rel="noopener"}
> - 创建公开的代码仓库命名为[name].github.io

> - 创建gh-pages分支

> - 进入仓库设置页的Actions/General选项页中，选择Action permissions选项的<i>Allow all actions and reusable workflows</i>，以及Workflow permissions选项的Read and write permissions，以使你的Workflows能正常的写入站点文件

> - 进入仓库设置页的Pages选项页，在Source下拉菜单中选择刚刚创建的gh-pages分支,通过[name].github.io访问时，将默认读取此分支下的静态文件

> **Eleventy中配置**
> - .nojekyll文件：在项目根目录中创建一个名为 <i>.nojekyll</i> 的空文件，此文件将阻止Github尝试将你的站点构建为jekyll站点.

> - .github目录：在项目根目录中创建一个名为 <i>.github</i> 的目录，并在此目录中创建名为 <i>workflows</i> 的目录.

> - build.yml文件：在上述步骤创建的workflows目录中创建名为 <i>build.yml</i> 文件，这个文件将会在你提交Git操作的时候触发工作流程，以在你每次更新内容的时候重新生成站点并发布.

> **build.yml**
```shell-session
name: Build Eleventy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-20.04

    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies & build
        run: |
          if [ -e package-lock.json ]; then
          npm ci
          else
          npm i
          fi
          npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./_site
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

---

### 参考引用
- [本项目开源地址](https://github.com/Dnevend/Dnevend.github.io)
- [Github Pages](https://docs.github.com/cn/pages)
- [Eleventy Documentation](https://www.11ty.dev/docs/tutorials/)
- [Creating A Blog With Eleventy](https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/)
- [Hosting Eleventy on GitHub Pages](https://quinndombrowski.com/blog/2022/05/07/hosting-eleventy-on-github-pages/)