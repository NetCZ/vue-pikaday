module.exports = {
  base: '/vue-pikaday/',
  title: 'VuePikaday',
  head: [
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600|Roboto Mono'
    }]
  ],
  extendMarkdown: md => {
    md.use(require('markdown-it-include'), './docs/guide');
    md.use(require('markdown-it-attrs'));
  },
  themeConfig: {
    repo: 'netcz/vue-pikaday',
    logo: '/vue-pikaday.png',
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'Config Reference',
        link: '/config/#props'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'installation',
            ['usage', 'Usage']
          ]
        }
      ],
      '/config/': [
        {
          title: 'Config Reference',
          collapsable: false,
          sidebarDepth: 0,
          children: [
            ['#props', 'Props'],
            ['#directives', 'Directives']
          ]
        }
      ]
    },
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    displayAllHeaders: true
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .use('babel-loader')
      .tap(options => {
        return Object.assign(options, {
          presets: [].concat(options.presets, [
            ['@babel/preset-env', { 'modules': false }],
            '@babel/preset-flow'
          ])
        })
      })
  }
};
