// configures webpack config for production

const path = require('path');
const webpack = require('webpack');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  mode: "production",
  entry: [
    path.join(CURRENT_WORKING_DIR, 'client/main.js')
  ],
  // output path for bundled code
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/'),
    filename: 'bundle.js',
    // base path for all assets
    publicPath: '/dist/'
  },
  // regex rules for file extension for transpilation
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      }
    ]
  },
};
module.exports = config;