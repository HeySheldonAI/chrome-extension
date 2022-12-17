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
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
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
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'content.js',
		path: path.resolve(__dirname, '..', 'react-extension'),
		publicPath: '',
	},
};
