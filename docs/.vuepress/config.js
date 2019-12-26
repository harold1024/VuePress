module.exports = {
  title: 'Harold\'s blog',
  description: '人间烟火气,最抚凡人心',
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