import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

export default {
  mode: 'development',
  devtool: 'inline-source-map',
  experiments: { asyncWebAssembly: true },
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(path.resolve(), 'dist'),
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(),
    }),
  ],
};
