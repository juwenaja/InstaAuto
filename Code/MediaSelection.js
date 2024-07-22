"use strict";

const inquirer = require('inquirer');
const { UploadPhoto } = require('./UploadPhoto');
const { UploadVideo } = require('./UploadVideo');

async function MediaSelection() {
  let continueUploading = true;

  while (continueUploading) {
    const { mediaType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'mediaType',
        message: 'Pilih jenis media yang ingin diupload:',
        choices: ['Photo', 'Video']
      }
    ]);

    let mediaPath, caption;

    if (mediaType === 'Photo') {
      ({ mediaPath, caption } = await inquirer.prompt([
        {
          type: 'input',
          name: 'mediaPath',
          message: 'Masukkan path foto (contoh: ./Database/Media/Example.jpg):',
          validate: (input) => input ? true : 'Path tidak boleh kosong.'
        },
        {
          type: 'input',
          name: 'caption',
          message: 'Masukkan caption untuk foto:'
        }
      ]));
      await UploadPhoto(mediaPath, caption);
    } else if (mediaType === 'Video') {
      ({ mediaPath, caption } = await inquirer.prompt([
        {
          type: 'input',
          name: 'mediaPath',
          message: 'Masukkan path video (contoh: ./Database/Media/Example.mp4):',
          validate: (input) => input ? true : 'Path tidak boleh kosong.'
        },
        {
          type: 'input',
          name: 'caption',
          message: 'Masukkan caption untuk video:'
        }
      ]));
      await UploadVideo(mediaPath, caption);
    }

    // Ask user if they want to upload more media
    const { uploadAgain } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'uploadAgain',
        message: 'Postingan yang kamu pilih berhasil di upload. Apakah ingin mengupload lagi?',
        default: false
      }
    ]);

    continueUploading = uploadAgain;
  }

  console.log('Silahkan memulai lagi dengan > npm start .');
}

module.exports = { MediaSelection };