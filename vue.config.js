const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/movie-record/' : '/',
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
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
        ]
      };
    } else {
      return {};
    }
  }
};
