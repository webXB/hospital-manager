'use strict'
require('./check-versions')();

process.env.NODE_ENV = 'dll';

const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./config')
const webpackConfig = require('./webpack.dll.conf')

const spinner = ora('building for dll...');
spinner.start();

rm(config.directory.dll,err=>{
  if(err) throw err;
  webpack(webpackConfig,(err,stats)=>{
    spinner.stop();
    if(err) throw err;
    process.stdout.write(stats.toString({
      colors:true,
      modules:false,
      children:false,
      chunks:false,
      chunkModules:false
    })+'\n\n');

    if(stats.hasErrors()){
      console.log(chalk.red('Build failed with errors. \n'));
      process.exit(1)
    }

    console.log(chalk.cyan('Build dll complete.\n'))
  });


})
