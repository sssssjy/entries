const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {separator} = require('./utils/constant');
const {getEntryTemplate} = require('./utils/entry');

// 将packages拆分成为数组 ['editor','home']
const packages = process.env.packages.split(separator);
const {entry, htmlPlugins} = getEntryTemplate(packages);

module.exports = {
    entry,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/static/css/[name].[contenthash:8].css'
        }),
        ...htmlPlugins
    ],
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: 'asset/inline'
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
            {
                test: /\.s(c|a)ss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader',
                    'resolve-url-loader',
                    {
                        loader:'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions:['.js','.jsx','.ts','.tsx']
    }
};