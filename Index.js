require('./Code/Config/DepreceatedHandler.js');

"use strict";

const chalk = require('chalk');
const figlet = require('figlet');
const moment = require('moment');
const AllFile = require('./Code/Index.js');

// StartUp
function displayStartupMessage() {
    console.clear();
    const header = chalk.greenBright.bold(figlet.textSync(' IG Auto API', { font: 'Big Money-sw', horizontalLayout: 'default', verticalLayout: 'default' }));
    console.log(header);
    console.log(chalk.cyanBright.bold('            =================================================================================\n'));
    console.log(chalk.red.bold(`                                         Created by: ${chalk.greenBright.bold(` W3NN`)}`));
    console.log(chalk.red.bold(`                                         Started at: ${chalk.greenBright.bold(moment().format("HH:mm:ss"))}\n`));
    console.log(chalk.cyanBright.bold('            ================================================================================='));
    console.log('');
}

// Function
async function Main() {
    displayStartupMessage();
    try {
        // Login
        console.log(chalk.red.bold('!> Starting Login Instagram...'));
        await AllFile.Login();
        console.log(chalk.red.bold('!> Login berhasil!\n'));
        console.log(chalk.blue.bold('──────────────────────────────\n'));

        // Handle Media Selection and Upload
        await AllFile.MediaSelection();

        console.log(chalk.green.bold(' !> Semua operasi berhasil diselesaikan.'));
    } catch (ERR) {
        console.log(chalk.red.bold('> Terjadi kesalahan.'));
        console.error(ERR);
    }
}

Main();