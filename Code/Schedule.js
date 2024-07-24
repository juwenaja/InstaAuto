"use strict";

const { IgApiClient } = require('instagram-private-api');
const fs = require('fs-extra');
const chalk = require('chalk');
const cron = require('node-cron');

const account = require('../Database/Account.json');
const { UploadPhoto } = require('./UploadPhoto');
const { UploadVideo } = require('./UploadVideo');

const ig = new IgApiClient();

async function scheduleUpload(mediaType, mediaPath, caption, hour) {
  ig.state.generateDevice(account.Username);

  const sessionPath = './Database/Session.json';

  // Load session
  if (await fs.pathExists(sessionPath)) {
    console.log(chalk.blue.bold('> Session file ditemukan. Memuat...'));
    const savedSession = await fs.readJson(sessionPath);
    await ig.state.deserialize(savedSession);
    console.log(chalk.blue.bold('> Session berhasil dimuat.'));
  } else {
    console.log(chalk.red.bold('> File session tidak ditemukan. Silakan login terlebih dahulu.'));
    return;
  }

  const cronTime = `0 ${hour} * * *`;

  cron.schedule(cronTime, async () => {
    // Hitung mundur pengingat
    let countdownMinutes = 5;
    const countdownInterval = setInterval(() => {
      if (countdownMinutes > 0) {
        console.log(chalk.yellow.bold(`Reminder: beberapa ${countdownMinutes} menit lagi akan diposting.`));
        countdownMinutes--;
      } else {
        clearInterval(countdownInterval);
      }
    }, 60000); // Hitung mundur setiap menit

    // Tunda eksekusi selama 5 menit sebelum upload
    await new Promise(resolve => setTimeout(resolve, 300000));

    try {
      if (mediaType === 'photo') {
        await UploadPhoto(mediaPath, caption);
      } else if (mediaType === 'video') {
        await UploadVideo(mediaPath, caption);
      }
    } catch (error) {
      console.log(chalk.red.bold('!> Gagal mengupload media.'));
      console.error(error);
    }
  });

  console.log(chalk.blue.bold(`> Posting terjadwal pada setiap jam ${hour}`));
}

module.exports = { scheduleUpload };