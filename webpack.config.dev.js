const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		// antes -> filename: '[name].[contenthash].js',
		filename: '[name].js',
		// antes -> assetModuleFilename: 'assets/images/[hash][ext][query]',
		assetModuleFilename: 'assets/images/[name][ext][query]',
	},
	mode: 'development',
	watch: true,
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
					// antes -> filename: 'assets/fonts/[name].[contenthash][ext][query]',
					filename: 'assets/fonts/[name][ext][query]',
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
			// antes -> filename: 'assets/styles/[name].[contenthash].css'
			filename: 'assets/styles/[name].css'
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
	// optimization: {
	// 	minimize: true,
	// 	minimizer: [new CssMinimizerPlugin]
	// }
}