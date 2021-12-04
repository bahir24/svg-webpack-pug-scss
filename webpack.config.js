const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const env = process.env.NODE_ENV
const isDevelopment = env === 'development';
const isProduction = env === 'production';

console.log(isDevelopment);
console.log(isProduction);

const config = {
    entry: {
        main: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app[contenthash].js'
    },
    resolve: {
        // root: path.resolve('./'),
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.pug$/,
                exclude: /(node_modules)/,
                use: [
                    "html-loader",
                    {
                        loader: "pug-html-loader",
                        options: {
                            pretty: isDevelopment,
                        },
                    },
                ],
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ["@babel/plugin-syntax-dynamic-import"]
                }
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

    // resolve: {

    // extensions: ['*', '.js', '.vue', '.json']
    //     alias: {
    //         'vue': 'vue/dist/vue.js',
    //         'vue$': 'vue/dist/vue.esm.js'
    //     },
    // },
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
            filename: "[name][contenthash].css",
            chunkFilename: "[contenthash].css"
        }),
        new VueLoaderPlugin()
    ]
};

module.exports = config;