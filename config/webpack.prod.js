const { merge } = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  devtool: false,
  target: 'browserslist',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  optimization: {
    minimize: true,
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false, // 设为 false 表示去除所有注释
        terserOptions: {
          compress: {
            pure_funcs: ['console.log', 'console.warn'] // 去除函数
          },
        }
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
});
