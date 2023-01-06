const path = require('path');

module.exports = {
	entry: {
		content: './src/index.jsx',
		background: './src/background.js',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(css|scss|sass)$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/i,
				loader: 'file-loader',
				options: {
					name: '/images/[name].[ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				loader: 'file-loader',
				options: {
					name: '/fonts/[name].[ext]',
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/build'),
		publicPath: '',
	},
};
