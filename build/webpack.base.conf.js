'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('./config');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size:os.cpus().length});
const vueLoaderConfig = require('./vue-loader.conf');

const base = {
  context: path.resolve(__dirname, '../'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    libraryTarget:'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      '@views': utils.resolve('src/modules/views'),
      '@assets': utils.resolve('src/assets'),
      '@less': utils.resolve('src/assets/less'),

      'services':utils.resolve('src/modules/services'),
      'utils':utils.resolve('node_modules/cloud-utils/dist/cloud-utils.esm'),
      'global':utils.resolve('src/assets/less/global.less')
    }
  },
  module: {
    rules: [
     // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use:['happypack/loader?id=happybabel'],
        include:[utils.resolve('src/modules')]
       },
      {
        test: /\.html$/,
        use: 'happypack/loader?id=happyhtml',
        include: config.directory.src,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include:[utils.resolve('src')],
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id:'happybabel',
      loaders:['babel-loader'],
      threadPool:happyThreadPool,
      cache:true,
      verbose:true
    }),

    new HappyPack({
      id:'happyhtml',
      loaders:['raw-loader'],
      threadPool:happyThreadPool,
      cache:true,
      verbose:true
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

if (process.env.NODE_ENV !== 'dll') {
  base.entry = {
    app: config.directory.modules + '/main.js'
  }
}

module.exports = base;
