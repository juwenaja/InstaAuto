"use strict";

const { IgApiClient } = require('instagram-private-api');
const fs = require('fs-extra');
const chalk = require('chalk');

const account = require('../Database/Account.json');
const ig = new IgApiClient();

async function UploadPhoto(photoPath, caption) {
  console.log(chalk.blue.bold('> Sedang mengupload gambar...'));

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

    // Upload photo
    const photoBuffer = await fs.readFile(photoPath);
    const uploadResponse = await ig.publish.photo({
      file: photoBuffer,
      caption: caption,
    });

    const postId = uploadResponse.media.pk;
    const postCode = uploadResponse.media.code;
    const postUrl = `https://www.instagram.com/p/${postCode}/`;

    console.log(chalk.green.bold('> Gambar berhasil diupload.'));
    console.log(chalk.green.bold(`> Status: ${uploadResponse.status}`));
    console.log(chalk.green.bold(`> Upload ID: ${uploadResponse.upload_id}`));
    console.log(chalk.green.bold(`> Link Postingan: ${postUrl}`));
  } catch (error) {
    console.log(chalk.red.bold('!> Gagal mengupload gambar.'));
    console.error(error);
  }
}

module.exports = { UploadPhoto };