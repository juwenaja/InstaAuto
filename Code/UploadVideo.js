"use strict";

const { IgApiClient } = require('instagram-private-api');
const fs = require('fs-extra');
const chalk = require('chalk');

const account = require('../Database/Account.json');
const ig = new IgApiClient();

async function UploadVideo(videoPath, caption) {
  console.log(chalk.blue.bold('> Sedang mengupload video...'));

  try {
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

    // Upload video
    const videoBuffer = await fs.readFile(videoPath);
    const uploadResponse = await ig.publish.video({
      video: videoBuffer,
      caption: caption,
    });

    const postId = uploadResponse.media.pk;
    const postCode = uploadResponse.media.code;
    const postUrl = `https://www.instagram.com/p/${postCode}/`;

    console.log(chalk.green.bold('> Video berhasil diupload.'));
    console.log(chalk.green.bold(`> Status: ${uploadResponse.status}`));
    console.log(chalk.green.bold(`> Upload ID: ${uploadResponse.upload_id}`));
    console.log(chalk.green.bold(`> Link Postingan: ${postUrl}`));
  } catch (error) {
    console.log(chalk.red.bold('!> Gagal mengupload video.'));
    console.error(error);
  }
}

module.exports = { UploadVideo };