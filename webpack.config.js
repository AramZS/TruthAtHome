var webpack = require('webpack');
const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
	devtool: 'inline-source-map',
	entry: ['./src/server.ts', './src/index.ts'],
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.tsx?$/,
				use: 'ts-loader'
			}
		]
	},
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, 'build')
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	target: 'node'
};
