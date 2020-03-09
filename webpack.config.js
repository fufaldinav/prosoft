const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: 'app.js'
    },

    devServer: {
        overlay: true
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://prosoft.localhost/'
            }
        )
    ],

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        inline: true,
        port: 10000
    },
}
