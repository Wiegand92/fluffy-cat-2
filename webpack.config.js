const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// In dev mode if env.NODE_ENV is developer //
const devMode = process.env.NODE_ENV === 'development';

const plugins = [
  new webpack.ProvidePlugin({
    React: 'react',
  }),
  // Will implement after refactoring code to React //
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
];

// Enable MiniCss in production only //
if (!devMode) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'scripts/style.css',
    }),
  );
}

module.exports = {
  mode: devMode ? 'development' : 'production',

  entry: './src/index.tsx',

  output: {
    filename: 'scripts/index.js',
    path: path.resolve(__dirname, 'docs'),
    clean: false,
  },

  plugins,
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          //If we're in dev-mode, use inline-styles, else extract to separate css file
          devMode
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },

  devServer: {
    hot: true,
    port: 8080,
  },

  devtool: 'source-map',
};
