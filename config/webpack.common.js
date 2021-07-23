const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { NODE_ENV } = process.env;
const paths = require('./paths');
const { isEnvDevelopment, isEnvProduction } = require('./env');

const getCssLoaders = () => {

  const cssLoaders = [
    isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: "[local]--[hash:base64:5]",
        },
        sourceMap: isEnvDevelopment,
      }
    }
  ];

  // 开发环境一般用chrome不会有问题，防止开发环境下看样式有一堆前缀影响查看，因此只在生产环境使用
  isEnvProduction && cssLoaders.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          isEnvProduction && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true
              }
            }
          ]
        ]
      }
    }
  })

  return cssLoaders;
};

module.exports = {
  mode: NODE_ENV,
  entry: {
    app: paths.appIndexJs,
  },
  output: {
    path: isEnvProduction ? paths.appBuild : undefined,
  },
  resolve: {
    alias: {
      '@': paths.appSrc,
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // context: 'public',
          from: '*',
          to: paths.appBuildPublic,
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],		// **表示任意目录下
          },
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...getCssLoaders()]
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isEnvDevelopment,
            }
          }
        ]
      },
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ]
  },
};
