const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const prodConfig = {
    mode: 'production',
    devtool: 'source-map',
    output:{
        filename: '[name]/static/js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins:[
        new CleanWebpackPlugin()
    ]
};

module.exports = merge(prodConfig, baseConfig);