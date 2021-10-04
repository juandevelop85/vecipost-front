const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ["@babel/preset-react"],
          // },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      //   {
      //     test: /\.(scss|sass|css)$/,
      //     exclude: /node_modules/,
      //     loaders: [
      //       MiniCssExtractPlugin.loader,
      //       {
      //         loader: "css-loader",
      //         options: {
      //           modules: true,
      //           sourceMap: true,
      //           importLoaders: 1,
      //           localIdentName: "[local]___[hash:base64:5]",
      //         },
      //       },
      //       "sass-loader",
      //     ],
      //   },
      // {
      //   test: /\.module\.s(a|c)ss$/,
      //   loader: [
      //     isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         sourceMap: isDevelopment,
      //       },
      //     },
      //     {
      //       loader: "sass-loader",
      //       options: {
      //         sourceMap: isDevelopment,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'images/',
              options: {
                limit: 900000,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      name: 'commons',
    },
  },
};
