const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(tsx|js|jsx|ts)$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: { noEmit: false },
						},
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
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},
	output: {
		filename: 'content.js',
		path: path.resolve(__dirname, '..', 'react-extension'),
		publicPath: '',
	},
};
