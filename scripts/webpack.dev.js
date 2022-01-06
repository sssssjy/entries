const path = require('path');
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const {BASE_PORT} = require('./utils/constant');

const devConfig = {
    mode: 'development',
    devServer:{
        static:{
            directory: path.resolve(__dirname, '../public')
        },
        hot: true,
        // 是否开启代码压缩
        compress: false,
        // 启动的端口
        port: BASE_PORT,
    }
};

module.exports = merge(devConfig, baseConfig);
