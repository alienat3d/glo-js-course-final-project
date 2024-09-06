const path = require('path');
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // минифицирует и переносит HTML-файл в папку dist. А также он подключит JS & CSS автоматически и можно их уже не подключать в .html-файле.

module.exports = {
  entry: {
    main: './src/index.js',
    // second: './src/second.js',
  }, // теперь мы можем подключить несколько точек входа
  output: {
    filename: './js/[name].min.js', // [name] значит, что сюда прилетит аналогичное название, которая у нас в точке входа
    path: path.resolve(__dirname, 'docs'), // указывает Webpack куда именно собирать сборку
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
  module: {
    // rules - команды обработки и первая команда отвечает за обработку CSS
    // test - когда Webpack начинает сканировать файлы, мы регуляркой отыскиваем все файлы с расширением css и обрабатываем данные файлы несколькими пакетами.
    rules: [
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  devtool: false,
  plugins: [
    new miniCss({
      filename: 'css/style.min.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/static' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      exclude: ['vendor.js'],
    }),
  ],
};
