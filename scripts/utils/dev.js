const inquirer = require('inquirer');

const execa = require('execa');
const { log, separator } = require('./constant');
const { entry } = require('./entry');

//包列表
const packageList = Object.keys(entry);

if (!packageList.length) {
    log('包列表不可为空');
    return
}

inquirer.prompt([
    /* Pass your questions in here */
    {
        type: 'checkbox',
        name: 'choice',
        message: '请选择要启动的项目',
        choices: ['all', ...packageList],
        validate: values => values.length > 0,
        filter: values => {
            if (values.includes('all')) return packageList;
            return values
        }
    }
]).then((answers) => {
    log(`选择的包 ${JSON.stringify(answers.choice)}`, 'success');
    runParallel(answers.choice);
    // Use user feedback for... whatever!!
}).catch((error) => {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
    } else {
        // Something else went wrong
    }
});

const runParallel = async list => {
    const message = `开始启动: ${list.join('-')}`;
    log(message, 'success');
    log('\nplease waiting some times...', 'success');
    await build(list)
};

const build = async list => {
    // 将选中的包通过separator分割
    const stringLists = list.join(separator);
    // 调用通过execa调用webapck命令
    // 同时注意路径是相对 执行node命令的cwd的路径
    // 这里我们最终会在package.json中用node来执行这个脚本
    await execa('webpack', ['server', '--config', './scripts/webpack.dev.js'], {
        stdio: 'inherit',
        env: {
            packages: stringLists,
        },
    });
};