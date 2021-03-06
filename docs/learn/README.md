---
sidebar: auto
type: guide
---

# VuePress从零开始搭建专属博客

## 简介

欢迎使用我的指南，了解如何使用[VuePress](https://github.com/harold1024/blog/)! 这个项目的产生是出于使用 [VuePress](https://vuepress.vuejs.org) 作为我的博客引擎的愿望，并且没有明确的途径.

### VuePress是什么？

VuePress是以Vue驱动的静态网站生成器，是一个由Vue、Vue Router和webpack驱动的单页应用。在VuePress中，你可以使用Markdown编写文档，然后生成网页，每一个由VuePress生成的页面都带有预渲染好的HTML，也因此具有非常好的加载性能和搜索引擎优化。同时，一旦页面被加载，Vue将接管这些静态内容，并将其转换成一个完整的单页应用，其他的页面则会只在用户浏览到的时候才按需加载。

### 版本

该项目目前位于 `version {{ $themeConfig.version }}`.

### 目的

该项目的目标很简单:

> 记录我使用[VuePress](https://vuepress.vuejs.org/)搭建博客的全过程,以便以后翻阅学习,同时希望可以帮到你,为你提供多样的选择,您根据自己的喜好自定义它。

### 功能

为什么要使用VuePress搭建博客呢,除了[VuePress](https://vuepress.vuejs.org/)自带的出色功能之外,您还可以立即使用以下工具：

- 自动生成主页上的最新帖子
- 简单的Google Analytics（分析）配置
- 自动RSS提要生成
- 简单的图标配置
- 主页上的简单分页
- 所有帖子的存档页面按日期排序

小菜一碟吧？那就不要时间浪费了，让我们开始吧！

## 入门

### 准备

- [NodeJS >= 8](https://nodejs.org/)
- [yarn](https://yarnpkg.com/lang/en/docs/install/) (可选)
- nodeJS以及vue基础知识
- [gitBash here](https://git-scm.com/downloads)

## 安装

<!-- ::: tip
If your plan is follow the tutorial all the way through to deployment, make sure you fork this project instead of simply cloning it!
::: -->

### 全局安装VuePress

```
yarn global add vuepress # 或者：npm install -g vuepress
```

### 创建项目目录

```
mkdir project
cd project
```

### 初始化项目

```
yarn init -y # 或者 npm init -y
```

### 新建docs文件夹

> docs文件夹作为项目文档根目录，主要放置Markdown类型的文章和.vuepress文件夹。

```bash
# 新建一个 docs 文件夹
mkdir docs

# 进入docs文件夹 创建 README.md文件
echo '# Hello VuePress!' > README.md
```

### 设置package.json

> VuePress中有两个命令，vuepress dev docs命令运行本地服务，通过访问http://localhost:8080即可预览网站，vuepress build docs命令用来生成静态文件，默认情况下，放置在docs/.vuepress/dist目录中，当然你也可以在docs/.vuepress/config.js中的dest字段来修改默认存放目录。在这里将两个命令封装成脚本的方式，直接使用npm run docs:dev和npm run docs:build即可。

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

- 此时运行命令
```
npm run  docs:dev
```
运行访问[http://localhost:8080/](http://localhost:8080/),(此时页面空白并无内容)

- 结束运行,执行命令
```
npm run docs:build
```

::: tip
- 查看文件变化 多了个node_modules 
- docs 多了个 .vuepress文件
:::

### [配置config.js](https://vuepress.vuejs.org/zh/config/)
 
```bash
# 在.vuepress 创建config.js 文件 
# 在config.js 添加配置信息
module.exports = {
  title: 'Harold\'s blog',
  description: '描述',
  head: [ // 注入到当前页面的 <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/VuePress/', // 部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    // 导航栏配置
    nav:[
      {text: 'Home', link: '/' },
      {text: 'Learn', link: '/learn/' },
      {text: 'Profile', link: '/profile/' },
      {text: 'vue', link: '/vue/' },
      {text: 'react', link: '/react/' },
      {text: '风花雪月', link: '/风花雪月/' }
    ],
    version: '0.11.0-beta'
  }
}
```

::: tip
- base 站点的基础路径，它的值应当总是以斜杠开始，并以斜杠结束。这里设置为 /VuePress/，我们再次在本地运行项目，访问路径就需要变更为http://localhost:8080/VuePress/
- title 网站的标题
- description 网站的描述
:::

### 运行项目

```
npm run  docs:dev
```
(如图)
![An image](./images/pro.png)


::: tip
自此项目已成功完成了技术文档的基本模型,如需个性化的配置可通过官网按需求优化；
:::


## 部署
完成上面的工作之后,当然还有最后一步,我们需要讲代码部署到服务器上,我这里介绍的是部署GitHub Pages,具体请参照文档：[Vupress-部署](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages).当然对于自己有服务器的,也可以尝试部署到自己的服务器上.

### 创建github仓库

- 在github上创建一个仓库,并将你的代码提交到github上.
- 在 `docs/.vuepress/config.js` 文件中设置正确的 base。部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 GitHub pages，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`，

### 自动部署

> 在项目根目录中，创建一个如下的 deploy.sh 脚本文件（请自行判断去掉高亮行的注释）:
```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```
> 在依赖`package.json`文件中添加
```
{
  "scripts": {
    "deploy": "bash deploy.sh"
  }
}
```
- 双击`deploy.sh`运行脚本 或者 项目根文件夹右键 gitBash here , 然后输入bash deploy.sh,会自动部署在我们的 GitHub 仓库中`deploy.sh`文件中配置的`master:gh-pages`分支

### 操作github
- 最后, 打开github, 在 GitHub 项目点击 Setting 按钮，找到 GitHub Pages - Source，选择 gh-pages 分支，点击 Save 按钮后，静静地等待它部署完成即可。

### 踩坑
::: tip
- 填坑
  当我完全按照合理的配置进行了操作,但是依旧没有把项目布置到GitHub Pages上
  ![An image](./images/404.png)
:::
- 挖坑:在`deploy.sh`文件中,最后push的时候有个坑`git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages`,如果你的项目是用ssh 克隆下来的就没问题，但很不幸,我是用简单并习惯的https 克隆下来的,
- 填坑: 配置ssh完以后重新用ssh克隆下项目，双击deploy.sh就可以自动部署了

### 配置ssh
#### 一.设置git的user name和email
> 如果你是第一次使用，或者还没有配置过的话需要操作一下命令，自行替换相应字段。
```
git config --global user.name "harold1024"
git config --global user.email  "744924498@qq.com"
```
#### 二.检查是否存在SSH Key
```
cd ~/.ssh
ls
//看是否存在 id_rsa 和 id_rsa.pub文件，如果存在，说明已经有SSH Key
```
- ls是列出所有文件，看有没有id_rsa 和 id_rsa_pub
- 如果有跳过生成密钥这一步

#### 三.生成密钥
```
ssh-keygen -t rsa -C "744924498@qq.com"
```
#### 四.获取SSH Key
```
cat id_rsa.pub
//拷贝秘钥 ssh-rsa开头
```
#### 五.GitHub添加SSH Key
- GitHub点击用户头像，选择setting
- 在左侧选择 SSH and GPG keys
- 新建一个SSH Key
- 取个名字，把之前拷贝的秘钥复制进去，添加就好啦。
#### 六.验证和修改
> 测试是否成功配置SSH Key
```
ssh -T git@github.com
//运行结果出现类似如下
Hi harold1024! You've successfully authenticated, but GitHub does not provide shell access.
```
>在项目 `Clone or download`中即可切换`Use HTTPS`为`Use SSH`.

<Valine></Valine>