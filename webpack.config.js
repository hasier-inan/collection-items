const config = require('./webpack.base.config.js');
const path = require('path');

config.mode= 'production';
config.entry = {
	CollectionItems: './src/collection-items/index.jsx'
};
config.devtool = 'sourcemaps';
config.output = {
	path: path.resolve(__dirname, './dist'),
	filename: '[name].js',
    libraryTarget: 'umd'
};

module.exports = config;
