const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		assetModuleFilename: 'assets/images/[name][ext][query]',
	},
	mode: 'development',
	devtool: 'source-map',
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
			filename: 'assets/styles/[name].css'
		}),
		new Dotenv(),
		new BundleAnalyzerPlugin()
	],
	devServer: {
		static:
		{
			directory: path.join(__dirname, "dist"),
			watch: true,
		},
		watchFiles: path.join(__dirname, "./**"), //observa los cambios en todos nuestros archivos y actualiza el navegador
		compress: true,
		historyApiFallback: true,
		port: 3006,
		open: false, //Hace que se abra en el navegador

	},
}