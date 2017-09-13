const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    example: __dirname + '/example/example.js',
    range: __dirname + '/range/test.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }, {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: './public',
    hot: true,
    inline: true
    // host: '192.168.6.237',
    // port: 9090
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'example.html',
      inject: true,
      template: __dirname + '/example/example.html',
      chunks: ['example']
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: __dirname + '/range/test.html',
      inject: true,
      chunks: ['range']
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
