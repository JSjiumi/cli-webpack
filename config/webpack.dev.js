const { merge } = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    publicPath: '/',
  },
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    stats: 'errors-only', // 只打印错误类型的日志
    clientLogLevel: 'none', // 去除多余网页console信息
    compress: true, // 启用gzip压缩
    open: true, // 第一次启动项目时自动打开默认浏览器
    hot: true, // 启用服务热替换配置
    noInfo: true, // 去除启动项目时显示的打包信息
    historyApiFallback: {
			index: paths.appHtml
    },
  },
  plugins: [
  ],
});
