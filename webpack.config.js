const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: __dirname + '/src/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './',
    disableHostCheck: true,
    public: 'https://datocms-plugin-better-slug.localtunnel.me',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname + '/src',
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DatoCMS Plugin',
      minify: isProduction,
    }),
    new HtmlWebpackTagsPlugin({
      append: false,
      publicPath: '',
      tags: [
        { type: 'css', path: 'https://unpkg.com/datocms-plugins-sdk@0.1.2/dist/sdk.css' },
        { type: 'js', path: 'https://unpkg.com/datocms-plugins-sdk@0.1.2/dist/sdk.js' },
      ],
    }),
  ].filter(Boolean),
}
