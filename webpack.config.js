const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const env = process.env.NODE_ENV
const isDevelopment = env === 'development';
const isProduction = env === 'production';
const FileColors = require('./src/js/colors.js');
const loader = require('sass-loader');
const jsToScss = require("./src/js/jsToCss.js");
// const mode = development;


// console.log(Colors);
// console.log(isProduction);

const config = {
    mode: 'none',
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
                            data: {
                                ColorsFromFile: FileColors,
                            }
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
                    'sass-loader',
                    {
                        loader: "@epegzz/sass-vars-loader",
                        options: {
                            syntax: 'scss',
                            vars: FileColors,
                        }
                    }
                ]
                    // {
                    //     loader:,

                        // options: {
                            // additionalData:"$value: 200px;",
                            // functions: {
                            //     "get($keys)": function(keys) {
                            //       keys = keys.getValue().split(".");
                            //       let result = sassVars;
                            //       let i;
                            //       for (i = 0; i < keys.length; i++) {
                            //         result = result[keys[i]];
                            //       }
                            //       result = sassUtils.castToSass(result);
                            //       return result;
                            //     },
                            //   },
                                // let scssVars = '';
                                // console.log(FileColors);
                                // Object.keys(FileColors).forEach(function(color, index){
                                //     let newScssVar = "$exampleKey" + index + ":" + color + ";";
                                //     scssVars += newScssVar;
                                // });

                            // }

                            // additionalData(){
                            //     return Object.keys(FileColors.fileColors).map(function(color){
                            //         return "$exampleKey:" + color;
                            //         // console.log(index);
                            //         // stringData += index + ': ' + color + ',';
                            //         // console.log(stringData);
                            //     });
                            //     // stringData += ')';
                            //     // return stringData;
                            // },
                        // },
                    // },
                            // additionalData: jsToScss(FileColors),
                            // prependData() {
                            //     let colorsString = '$fileColors: (';
                            //     Object.keys(Colors).forEach(key => {
                            //         colorsString += key + ': ' + Colors.key + ',';
                            //     });
                            //     colorsString += ');'
                            //     return colorsString;
                            // }
                            // exportOnlyLocals: false,
                            // additionalData: {
                            //     fileColors: "text here",
                            // },
                            // webpackImporter: false,
                            // data: {
                                // fileColors: Colors,
                            // }
                            // additionalData: "num",

                    //     },
                    // },
                // ],
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        watchFiles: {
            paths: ['src/blocks/*', 'src/scss/*'],
            options: {
              usePolling: false,
            },
          },
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
            filename: "[name][contenthash].css",
            chunkFilename: "[contenthash].css"
        }),
        new VueLoaderPlugin()
    ]
};

module.exports = config;