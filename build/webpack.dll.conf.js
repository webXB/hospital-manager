'use strict'
const path = require('path')
const utils = require('./utils');
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const vendors = [
  'axios',
  'vue',
  'vue-router',
  'normalize.css'
]

const webpackConfig = merge(baseWebpackConfig,{
  entry:{
    vendor:vendors
  },
  module: {
    rules:utils.styleLoaders({
      sourceMap:config.build.productionSourceMap,
      extract:true,
      usePostCSS:true
    })
  },
  devtool: config.build.devtool,
  output:{
    path:config.directory.dll,
    filename:'[name].dll.js',
    library:'[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path:path.join(config.directory.root, 'vendor-manifest.json'),
      name:'[name]_library',
      context:config.directory.root
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings:false,
        drop_console:true
      },
      sourceMap:config.build.productionSourceMap,
      parallel:true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename:'[name].dll.css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions:{
        safe:true,

      }
    }),
    new webpack.ProgressPlugin()
  ]
});

if(config.build.productionGzip){
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset:'[path].gz[query]',
      algorithm:'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig;
