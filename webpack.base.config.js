const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const env = process.env.NODE_ENV;

module.exports = {
    mode: env || 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [['@babel/preset-env', { 'targets': { 'node': 6 } }]]
                }
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /dist/],
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?|(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?)$/,
                loader: "base64-inline-loader?limit=1000&name=[name][hash].[ext]",
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', '.md', '.jpg', '.png', '.gif', '.svg', '.ttf', '.eot', '.woff', '.woff2']
    },
    stats: {
        colors: true,
        warnings: false
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    performance: { hints: false },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es|en/),
        new MiniCssExtractPlugin({
            filename: `[name].css`
        })
    ],
    devtool: 'inline-source-map'
};
