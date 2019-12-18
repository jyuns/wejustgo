
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: './components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    '@/assets/css/default.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    { src : '@/plugins/persisted-state.js', ssr:false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-leaflet',
  ],

  axios : {
    
  },

/**
  proxy : {
    '/user/' : {
      target : 'http://www.wejustgo.bid',
      changeOrigin : true
    },
    '/chat/' : {
      target : 'http://www.wejustgo.bid',
      changeOrigin : true
    },
    '/other/' : {
      target : 'http://www.wejustgo.bid',
      changeOrigin : true
    },
    '/search/' : {
      target : 'http://www.wejustgo.bid',
      changeOrigin : true
    }
  }, */
  /*
  ** Build configuration
  */
  build: {

    //polyfill 설정

    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value 
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    },

    extend (config, ctx) {
    }
  }
}
