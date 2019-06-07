/* @file
 * initialize webpack to compile 
 * client-side code with server
 * compile, bundle serve code, and 
 * enable hot reloading in development
 */
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './../webpack.config.client';

/*
 * @param {express object} app
 *   Express app from ./server.js
*/
const compile = (app) => {
    if(process.env.NODE_ENV === "development") {
      const compiler = webpack(webpackConfig);
      const middleware = webpackMiddleware(compiler,
        {
          publicPath: webpackConfig.output.publicPath
        }
      );
      app.use(middleware);
      app.use(webpackHotMiddleware(compiler));
    }
};

export default {
  compile
};