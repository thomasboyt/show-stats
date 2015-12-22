var webpack = require('webpack');
var path = require('path');

var createGlobChunk = require('./webpack-glob-chunk');

module.exports = {
  entry: {
    app: './app/main.js',
  },

  output: {
    path: 'build/',
    filename: '[name].bundle.js'
  },

  plugins: [
    createGlobChunk({
      name: 'vendor',

      patterns: [
        './node_modules/**/*.js',
        './vendor/**/*.js'
      ]
    }),

    // XXX: this doesn't work yet and I don't know why not :(
    // createGlobChunk({
    //   name: 'data',
    //
    //   patterns: [
    //     './songs#<{(||)}>#*'
    //   ],
    // })
  ],

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules\/)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['syntax-async-functions', 'transform-object-rest-spread', 'transform-regenerator']
        }
      },
      {
        test: /\.scss/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /(?:\.woff$|\.woff2$|\.ttf$|\.svg$|\.eot$)/,
        loader: 'file-loader',
        query: {
          name: '/font/[hash].[ext]'
        }
      },
      {
        test: /(?:\.mp3)/,
        loader: 'file-loader',
        query: {
          name: '/assets/[hash].[ext]'
        }
      },
      {
        test: /(?:\.json)/,
        loader: 'json-loader'
      }

    ]
  },

  devServer: {
    historyApiFallback: true,
  },
};
