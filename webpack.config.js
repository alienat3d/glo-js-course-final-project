// VideoURL: https://www.youtube.com/watch?v=IZGNcSuwBZs

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development',
	entry: {
		/* a multiple entry points example */
		bundle: path.resolve(__dirname, 'src/index.js'), /* set a path to an entry point */
		admin: path.resolve(__dirname, 'src/admin-index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js', /* set name from entry and add hash for better caching */
		clean: true, /* clean older files */
		assetModuleFilename: '[name][ext]'
	},
	devtool: 'source-map', /* add source maps */
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist') /* set a folder where the devServer will look for files */
		},
		port: 3000, /* set a custom port */
		open: true, /* opens a new page in browser by starting the script */
		hot: true, /* a hot reload */
		compress: true, /* compress in GZip */
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				/* select loaders for specific extensions */
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				/* for older browsers support */
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|webp|avif|gif)$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Relax Live', /* custom title */
			filename: 'index.html', /* target HTML */
			chunks: ['bundle'], /* select JS-bundle */
			template: 'src/template-index.html' /* select HTML template */
		}),
		new HtmlWebpackPlugin({
			title: 'Вход для администрации «Relax Live»',
			filename: 'admin/index.html',
			chunks: ['admin'],
			template: 'src/template-admin-index.html'
		}),
		new HtmlWebpackPlugin({
			title: 'Администрация «Relax Live»',
			filename: 'admin/table.html',
			chunks: ['admin'],
			template: 'src/template-admin-table.html'
		}),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/static' }
      ]
    }),
		// new BundleAnalyzerPlugin()
	]
}
