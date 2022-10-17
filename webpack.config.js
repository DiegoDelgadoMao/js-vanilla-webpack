const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/images/[hash][ext][query]',
		clean: true,
	},
	mode: 'production',
	resolve: {
		extensions: ['.js'],
		alias: {
			'@templates': path.resolve(__dirname, 'src/templates'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@images': path.resolve(__dirname, 'src/assets/images'),
			'@fonts': path.resolve(__dirname, 'src/assets/fonts')
		}
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s?css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.png/,
				type: "asset/resource"
			},
			{
				test: /\.(woff|woff2)$/,
				type: "asset/resource",
				generator: {
					filename: 'assets/fonts/[name].[contenthash][ext][query]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			template: './public/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/styles/[name].[contenthash].css'
		}),
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: path.resolve(__dirname, "src", "assets/images"),
		// 			to: "assets/images"
		// 		}
		// 	]
		// }),
		new Dotenv(),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin]
	}
}