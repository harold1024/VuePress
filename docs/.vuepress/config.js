module.exports = {
  title: '博客标题',
  description: '描述',
  head: [ // 注入到当前页面的 <head> 中的标签
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['link', { rel: 'manifest', href: '/images/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/logo.png' }],
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/blog/', // 部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    // 导航栏配置
    nav:[
      {text: 'xxx', link: '/demo/' },
    ],
    sidebar:[
      {
        title: '侧边栏名称', // 侧边栏名称
        collapsable: true, // 可折叠
        children: [
          '/md文件地址/', // 你的md文件地址
        ]
      },
    ]
  }
}