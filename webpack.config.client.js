const path = require('path');
const webpack = require('webpack');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  name: "browser",
  // default value of mode is 'production'
  // sets process.env.NODE_ENV to development
  mode: "development",
  // specifies how source maps are generated
  // source map provides a way of mapping code within a compressed file back to its original position in a source file to aid debugging
  devtool: 'eval-source-map',
  // specify entry file where webpack starts bundling
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.join(CURRENT_WORKING_DIR, 'client/main.js')
  ],
  // output path for bundled code
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
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
  // enables hot module replacement fr react-hot-loader
  // allow skipping emitting when there are compile errors
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
module.exports = config;