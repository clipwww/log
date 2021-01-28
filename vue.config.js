const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/movie-record/' : '/',
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        externals: {
          moment: 'moment'
        },
        plugins: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            terserOptions: {
              compress: {
                drop_console: true,
                pure_funcs: ['console.log']
              }
            }
          }),
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ]
      };
    } else {
      return {
        externals: {
          moment: 'moment'
        }
      };
    }
  }
};
