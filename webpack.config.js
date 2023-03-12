const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: ["./src/index.js", "./styles/index.scss"],
        about: ["./src/about.js"],
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[name][hash][ext]",
                },
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name][hash][ext]",
                },
            },
            {
                test: /\.scss$/,
                use: [
                    // "style-loader", // creates style nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader", // compiles Sass to CSS
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            // filename: "index.html",
            // inject: "body",
            chunks: ["index"],
        }),
    ],
};
