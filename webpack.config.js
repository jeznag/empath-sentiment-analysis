const webpack = require('webpack');
const path = require('path');
const PROD = JSON.parse(process.env.PROD_DEV || '0');

module.exports = {
  entry: [
    './src/empath.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'empath.js'
  },
  devtool: ['source-map'],
  resolveLoader: {
    packageMains: ['json-loader']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: [
          ]
        }
      }
    ]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    })
  ] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    })
  ]
};
