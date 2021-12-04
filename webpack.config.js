const path = require('path');
const argv = require('yargs').argv;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevelopment = argv.mode === 'development';
const isProduction = argv.mode === 'production';

const config = {
    entry: {
        main: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.pug$/,
                exclude: /(node_modules)/,
                use: [
                    "html-loader",
                    {
                        loader: "pug-html-loader",
                        options: {
                            pretty: true,
                        },
                    },
                ],
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            }, {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        open: true,
        host: 'localhost',
        port: '8080',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: './index.html',
            path: path.join(__dirname, "dist/"),
            scriptLoading: 'blocking',
            inject: 'body',
            files: {
                "css": ["main.scss"],
                "js": ["app.js"],
                "chunks": {
                    "head": {
                        "css": ["main.css"]
                    },
                    "main": {
                        "entry": ["app.js"],
                    },
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[contenthash].css"
        }),
    ]
};

module.exports = config;