"use strict";

const fs = require('fs-extra');
const chalk = require('chalk');
const sharp = require('sharp');
const { IgApiClient } = require('instagram-private-api');

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

    // Read and process photo using sharp
    const processedPhoto = await sharp(photoPath)
      .resize(1080, 1080, { fit: 'cover' }) // Resize image to meet Instagram's requirements
      .jpeg()
      .toBuffer();

    console.log(chalk.blue.bold('> Gambar berhasil diproses.'));

    // Upload photo
    const uploadResponse = await ig.publish.photo({
      file: processedPhoto,
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

    if (error.name === 'IgLoginRequiredError') {
      console.log(chalk.red.bold('> Login diperlukan. Mencoba login ulang...'));
      await loginAndSaveSession();
      await UploadPhoto(photoPath, caption); //Retrying upload if new login.
    }
  }
}

async function loginAndSaveSession() {
  ig.state.generateDevice(account.Username);
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(account.Username, account.Password);
  await ig.simulate.postLoginFlow();

  // Save session
  const sessionPath = './Database/Session.json';
  const serialized = await ig.state.serialize();
  delete serialized.constants; // Delete less data
  await fs.writeJson(sessionPath, serialized);
  console.log(chalk.green.bold('> Sesi berhasil disimpan.'));
}

module.exports = { UploadPhoto };