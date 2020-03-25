const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

const environment = "development";

module.exports = {
    entry: {
        bundle: "./src/index.tsx",
    },

    mode: environment,

    output: {
        publicPath: "/",
        filename: "main.js",
        path: path.join(process.cwd(), "../server/public"),
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
    plugins: [
        new HtmlWebpackPlugin({
            template: "templates/index.ejs",
            minify: environment,
            filename: "index.html",
        }),
    ],
    devServer: {
        watchOptions: {
            ignored: /node_modules/,
        },
    },
    node: {
        fs: "empty",
    },
};
