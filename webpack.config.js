const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'wp-content/themes/reactapp/assets/js/app': './wp-content/themes/reactapp/private/reactjs/App.js',
        "wp-content/themes/reactapp/assets/styles/custom-style": "./wp-content/themes/reactapp/private/scss/style.scss",
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js'
    },
    mode: devMode ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './[path][name].[ext]',
                        emitFile: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            // online theme
            // { from: './wp-content/themes/online-shop-child/private/assets', to: './wp-content/themes/online-shop-child/assets' },
           
        ]),
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            // online theme
            // filename: devMode ? './wp-content/themes/online-shop-child/assets/styles/[name].css' : './wp-content/themes/online-shop-child/[name].[hash].css',
            // chunkFilename: devMode ? './wp-content/themes/online-shop-child/assets/styles/[id].css' : './wp-content/themes/online-shop-child/[id].[hash].css'

            // electro theme
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        })
    ],
    devtool: devMode ? 'inline-source-map' : false,
}
