const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {MAIN_FILE} = require('./constant');

//多入口文件夹路径
const dirPath = path.resolve(__dirname, '../../src/');

//保存入口文件
const entry = Object.create(null);

//同步读取路径 返回一个包含“指定目录下所有文件名称”的数组对象
fs.readdirSync(dirPath).forEach((file) => {
    const entryPath = path.join(dirPath, file);
    const mainFilePath = path.join(entryPath, MAIN_FILE);
    //获取文件信息 是否能读取到入口文件的信息
    try {
        if (fs.statSync(mainFilePath)) {
            entry[file] = mainFilePath;
        }
    } catch (e) {

    }
});


const getEntryTemplate = packages => {
    const entry = Object.create(null);
    const htmlPlugins = [];

    packages.forEach(packageName => {
        entry[packageName] = path.join(dirPath, packageName, MAIN_FILE);
        htmlPlugins.push(new htmlWebpackPlugin({
            filename: `${packageName}/index.html`,
            chunks: [packageName],
            template: path.resolve(__dirname, '../../public/index.html')
        }))
    });

    // console.log(entry, htmlPlugins);
    return {entry, htmlPlugins}
};

// const list = [];
// fs.readdirSync(dirPath).forEach((file) => {
//
//     const entryPath = path.join(dirPath, file);
//     try {
//         if (fs.readdirSync(entryPath).length) list.push(file);
//     } catch (e) {
//
//     }
// });
// getEntryTemplate(list);

module.exports = {
    entry,
    getEntryTemplate
};

