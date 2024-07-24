process.emitWarning = (warning, ...args) => {
    const chalk = require('chalk');
    if (args.includes('DeprecationWarning') && warning.includes('punycode')) {
        console.warn(chalk.red.bold('The `Punycode` module is deprecated!'));
    } 
    else {
        process.__emitWarning(warning, ...args);
    }
};

process.__emitWarning = process.emitWarning;
