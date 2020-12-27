const config = require("./webpack.base.config.js");

config.mode = "development";
config.entry = ['./preview/preview.js'];

config.output = {
	path: "/",
	publicPath: "/dist/",
	filename: "CollectionItems.js",
};
config.devtool = "sourcemaps";

config.devServer = {
	contentBase: "./preview/public",
	historyApiFallback: true,
	compress: true,
	stats: "errors-only",
	open: true,
};

module.exports = config;
