---
title: webpack打包原理
date: 2019-12-25 21:50:21
type: post
blog: true
excerpt: webpack 是一个现代 JavaScript 应用程序的静态模块打包器,是项目开发中比较使用的对项目进行管理的工具。
heroImage: /bg5.jpg
tags:
    - JavaScript
---

## 《念奴娇·赤壁怀古》

webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle
## webpack四个核心概念
#### 一 入口
webpack.config.js里配置
```
module.exports = {
  entry: './src/index.js'
};
```
#### 二 输出
webpack.config.js里配置
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.min.js'
  }
};
```
#### 三 loader
webpack loader 将所有类型的文件，转换为应用程序的依赖图可以直接引用的模块
#### 四 插件(plugins)
通过require()将想要使用的插件添加到plugins数组中,多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

## webpack------搭建项目


####1.初始化
`
npm init -y
`
安装webpack
`
npm i webpack_dome webpack-cli -D
`
####2.webpack配置
在根目录下新建src文件夹,在src里新建index.js文件
index.js文件
```
console.log("hello world")
```
创建并配置webpack.config.js文件
webpack.config.js文件
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.min.js'
  }
};
```
####3.package配置
配置 package.json 文件，在scripts中添加'build'使得运行`npm run build`可以直接执行`webpack`命令,在根目录内会生成dist文件夹,里面是对应生成的文件,
安装`npm install --save-dev express webpack-dev-middleware`,添加'start'使得运行`npm run start`可以直接执行`webpack-dev-server`命令,
 package.json 文件
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server",
    "build": "webpack"
  },
```
####4.删除旧文件
再次打包时需要删除旧文件
执行 `npm install clean-webpack-plugin --save-dev `命令，安装依赖。
修改webpack.config.js文件配置
```
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.min.js'
  },
  plugins: [
    // 默认情况下，此插件将删除 webpack output.path目录中的所有文件。
    new CleanWebpackPlugin(),
  ]
}
```
####5.文件引入html
#####手动引入方式
新建index.html文件,并手动引入打包后的js文件
#####自动引入方式
执行 `npm i html-webpack-plugin --save-dev `命令，安装依赖。
新建index.ejs文件
```
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
</body>
</html>
```
修改webpack.config.js文件配置
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.min.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: 'New HTML',  //打包后生成 html 的 title
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
      filename: 'index.html', // 生成后的文件名
      template: 'index.ejs' // 根据此模版生成 HTML 文件
    }),
    // 默认情况下，此插件将删除 webpack output.path目录中的所有文件。
    new CleanWebpackPlugin(),
  ]
}
```
重新运行 npm run build，生成新的 dist 包，包内会生成一个新的 index.html 文件，并自动引入了 index.min.js 文件。
####6.自动打开浏览器，支持热更新
执行 `npm i open-browser-webpack-plugin webpack-dev-server --save-dev `命令，安装依赖。
修改 webpack.config.js 配置
```
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
</body>
</html>
```
修改webpack.config.js文件配置
```
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html
const OpenBrowserPlugin = require('open-browser-webpack-plugin') // 自动打开浏览器
const CleanWebpackPlugin = require('clean-webpack-plugin') //自动删除旧文件dist包
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.min.js'
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: 'New HTML',  //打包后生成 html 的 title
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
      filename: 'index.html', // 生成后的文件名
      template: 'index.ejs' // 根据此模版生成 HTML 文件
    }),
   // 默认情况下，此插件将删除 webpack output.path目录中的所有文件。
    new CleanWebpackPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8099' })
  ],
  //编译前文件调试
  devtool: "source-map"
}
```



