const chalk = require('chalk');
const chalckConfig = {
    success: chalk.green,
    warning: chalk.hex('#ffa500'),
    error: chalk.bold.red
};

//固定入口文件名
const MAIN_FILE = 'index.tsx';

// 因为环境变量的注入是通过字符串方式进行注入的
// 所以当 打包多个文件时 我们通过*进行连接 比如 home和editor 注入的环境变量为home*editor
// 注入多个包环境变量时的分隔符
const separator = '*';

const BASE_PORT = 9000;

const log = (message, types = 'error') => {
    console.log(chalckConfig[types](message))
};

module.exports = {
    MAIN_FILE,
    log,
    separator,
    BASE_PORT,
};