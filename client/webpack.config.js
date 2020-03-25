const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

require("dotenv").config({ path: "./.env" });

module.exports = {
    entry: {
        bundle: "./src/index.tsx",
    },
    
    mode: process.env.NODE_ENV || "development",

    output: {
        publicPath: "/dist",
        filename: "main.js",
        path: path.join(process.cwd(), "/dist"),
    },

    devtool: "source-map",

    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: [".ts", ".tsx", ".js", ".json"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
            {
                enforce: "pre",
                test: /\.js*/,
                loader: "source-map-loader",
                exclude: [/node_modules/, /build/],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            module: true,
                            camelCase: true,
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        watchOptions: {
            ignored: /node_modules/,
        },
    },
    node: {
        fs: "empty",
    },
};