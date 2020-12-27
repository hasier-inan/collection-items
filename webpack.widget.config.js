const config = require('./webpack.base.config.js');
const path = require('path');
const pkg = require('./package.json')

config.mode= 'production';
config.entry = {
    "collection-items-widget": './src/collection-items-widget'
};
config.devtool = 'sourcemaps';
config.output = {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-'+pkg.version+'.js',
    libraryTarget: 'umd'
};

module.exports = config;
