const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    entry: ["./src/js/index.js", "./src/scss/style.scss"],
    output: {
        path: __dirname + '/public',
        filename: "js/main.min.js"
    },
    devtool: "source-map",
    mode: "production",
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                extractComments: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, "./src/scss"),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        attrs: ['img:src','link:href','source:srcset']
                    }
                }
            },
            {
                test: /\.(svg|png|jpg|eot)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./images"
                    }
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: "./src/images",
        //             to: "./images"
        //         },
        //         {
        //             from: "./src/js/*.json",
        //             to: './js/[name].[ext]'
        //         }
        //     ]
        // }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: "./src/html/index.html"
        }),

        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '80'
            },
            jpegtran: {
                quality: '80',
                progressive: true
            }
        })
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.plugins.push(new CleanWebpackPlugin());
    }
    return config;
};

