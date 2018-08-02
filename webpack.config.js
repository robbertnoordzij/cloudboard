const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { version } = require('./package.json');

const env = process.env.NODE_ENV;
const config = {
  entry: './src/main.js',
  output: {
    path: 'public',
    publicPath: '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cloudboard',
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      analytics: 'UA-89786772-1',
      favicon: './favicon.png',
      hash: true,
      version
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ]
};

if (env === 'development') {
  config.devtool = 'source-map';
  config.watch = true;
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        unsafe: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
