"use strict";

const { IgApiClient } = require('instagram-private-api');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');

const ig = new IgApiClient();
const sessionPath = './Database/Session.json';
const accountPath = path.resolve(__dirname, '../Database/Account.json');

async function Login() {
  console.log(chalk.blue('Starting Instagram login script...'));

  ig.state.generateDevice(''); // Set a default value for device generation

  try {
    // Load session if exists
    if (await fs.pathExists(sessionPath)) {
      console.log(chalk.yellow('Session file found. Loading...'));
      const savedSession = await fs.readJson(sessionPath);
      await ig.state.deserialize(savedSession);
      console.log(chalk.green('Logged in using saved session.'));
    } else {
      console.log(chalk.yellow('No session file found. Logging in...'));

      // Check if account file exists
      if (!await fs.pathExists(accountPath)) {
        throw new Error('Account file not found.');
      }

      // Read account details from file
      const account = await fs.readJson(accountPath);
      const username = account.Username;
      const password = account.Password;

      // Prompt user for username and password if not in Account.json
      if (!username || !password) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'username',
            message: 'Masukkan username Instagram:',
          },
          {
            type: 'password',
            name: 'password',
            message: 'Masukkan password Instagram:',
          }
        ]);
        ig.state.generateDevice(answers.username);
        await ig.account.login(answers.username, answers.password);

        // Update Account.json
        await fs.writeJson(accountPath, {
          Username: answers.username,
          Password: answers.password
        }, { spaces: 2 });
      } else {
        ig.state.generateDevice(username);
        await ig.account.login(username, password);
      }

      // Save session
      const serialized = await ig.state.serialize();
      delete serialized.constants; // Remove constants from serialization
      await fs.outputJson(sessionPath, serialized, { spaces: 2 });
      console.log(chalk.green('Session saved.'));
    }
  } catch (error) {
    console.log(chalk.red('Failed to login or save session.'));
    console.error(error);
  }
}

module.exports = { Login };