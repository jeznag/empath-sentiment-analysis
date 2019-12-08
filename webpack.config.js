const path = require('path');
const env = process.env.ENV || 'development';

module.exports = {
  entry: ['./src/empath.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'empath.js',
    library: 'empath'
  },
  mode: env,
  devtool: env === 'production' ? '' : 'source-map',
  optimization:
    env === 'prodfuction'
      ? {
          minimize: true
        }
      : {},
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
