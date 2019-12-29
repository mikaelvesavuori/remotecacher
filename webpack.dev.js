const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  context: srcDir,
  entry: './index.mjs',
  output: {
    path: distDir,
    filename: 'remotecacher.js',
    publicPath: '/',
    libraryTarget: 'var',
    library: 'RemoteCacher'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules/'),
      path.resolve(__dirname, 'src/'),
      path.resolve(__dirname, './')
    ],
    extensions: ['.js', '.mjs']
  },
  devServer: {
    // https: true,
    historyApiFallback: true,
    contentBase: srcDir,
    publicPath: '/',
    hot: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html'),
      path: distDir,
      filename: 'index.html',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ],
  performance: {
    maxEntrypointSize: 20480,
    maxAssetSize: 20480,
    hints: 'warning'
  }
};
