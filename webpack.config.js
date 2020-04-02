const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',

    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
    },

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, './public'),
        filename: './js/app.js',
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://prosoft.localhost/',
            },
        ),
        new MiniCssExtractPlugin({
            filename: './stylesheets/main.css',
        }),
    ],
};
