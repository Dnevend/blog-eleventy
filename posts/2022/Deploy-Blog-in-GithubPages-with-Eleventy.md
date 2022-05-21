---
layout: post-layout.njk
title: 使用Eleventy在GithubPages上部署博客站点
date: 2022-05-15
tags: ["post"]
---

<!-- Excerpt Start -->

使用静态站点，让博客更接近于内容的本质，减少来自服务器维护、域名、版本管理等一系列的操作和时间成本。

<!-- Excerpt End -->

### 什么是静态网站和静态网站生成器

- 静态网站：
        静态网页由 HTML，CSS 和可选的 Javascript 组成。该页面不必由服务器端编程语言按需生成。

- 静态网站生成器：
        静态 Web 页面生成器在本地计算机或云中生成完整的静态 Web 页面。然后，这些可以存储在服务器或内容分发网络（CDN）中。
        与内容管理系统类似，生成器提供了使用布局模板，分离内容和页面框架，在某些情况下甚至可以从外部 CMS 中提取内容。
    
- 本站点使用了[Eleventy](https://www.11ty.dev/)， 常见的还有[Hugo](https://gohugo.io/)、[Hexo](https://hexo.io/)、[Next.js](https://nextjs.org/)及Github官方默认的[Jekyll](https://www.jekyll.com/)等等

### 静态生成博客站点的优势

    - 当部署在GithubPages上，可直接通过域名[yourname].github.io访问，节省域名费用成本
    - 无需服务器和数据库，确保了站点的安全性
    - 可以使用多种Html、MarkDown等模板语言
    - 文档可以通过Git进行版本管理
    - 站点迁移方便

### 构建流程

### 发布流程

### 使用流程

### 关键点

### 参考引用

- [Eleventy Documentation](https://www.11ty.dev/docs/tutorials/)
- [Creating A Blog With Eleventy](https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/)
- [Hosting Eleventy on GitHub Pages](https://quinndombrowski.com/blog/2022/05/07/hosting-eleventy-on-github-pages/)
