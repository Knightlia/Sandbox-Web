import path from "path";
import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const postcssLoader = {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: ["autoprefixer", "cssnano"]
        }
    }
};

export default (env: {}, argv: { mode: string }) => {
    const config: Configuration = {
        mode: "none",
        entry: {
            main: "./src/app.tsx"
        },

        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name].[fullhash].js",
            chunkFilename: "[name].[chunkhash].js"
        },

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                config: path.join(__dirname, "src", "core", "ts", "config", argv.mode)
            },
            extensions: [".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        postcssLoader,
                        "less-loader"
                    ]
                },
                {
                    test: /\.svg$/,
                    type: "asset/source"
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({ filename: "[name].[fullhash].css" }),

            new CopyPlugin({
                patterns: [
                    { from: "./public", to: "." }
                ]
            }),

            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html",
                chunks: ["main"],
                inject: true,
                minify: true
            })
        ]
    };

    return config;
}
