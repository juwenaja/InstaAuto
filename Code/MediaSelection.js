"use strict";

const inquirer = require('inquirer');
const { UploadPhoto } = require('./UploadPhoto.js');
const { UploadVideo } = require('./UploadVideo.js');
const { scheduleUpload } = require('./Schedule.js');

async function MediaSelection() {
    const { mediaType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'mediaType',
            message: 'Pilih jenis media yang ingin diupload:',
            choices: ['Photo', 'Video', 'Schedule Post']
        }
    ]);

    if (mediaType === 'Photo') {
        const { photoPath, caption } = await inquirer.prompt([
            {
                type: 'input',
                name: 'photoPath',
                message: 'Masukkan path foto (contoh: ./Database/Media/Example.jpg):'
            },
            {
                type: 'input',
                name: 'caption',
                message: 'Masukkan caption untuk foto:'
            }
        ]);
        await UploadPhoto(photoPath, caption);
    } else if (mediaType === 'Video') {
        const { videoPath, caption } = await inquirer.prompt([
            {
                type: 'input',
                name: 'videoPath',
                message: 'Masukkan path video (contoh: ./Database/Media/Example.mp4):'
            },
            {
                type: 'input',
                name: 'caption',
                message: 'Masukkan caption untuk video:'
            }
        ]);
        await UploadVideo(videoPath, caption);
    } else if (mediaType === 'Schedule Post') {
        const { scheduleType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'scheduleType',
                message: 'Pilih jenis media yang ingin dijadwalkan:',
                choices: ['Photo', 'Video']
            }
        ]);

        const { mediaPath, caption, hour, minute } = await inquirer.prompt([
            {
                type: 'input',
                name: 'mediaPath',
                message: `Masukkan path ${scheduleType.toLowerCase()} (contoh: ./Database/Media/Example.${scheduleType.toLowerCase() === 'photo' ? 'jpg' : 'mp4'}):`
            },
            {
                type: 'input',
                name: 'caption',
                message: `Masukkan caption untuk ${scheduleType.toLowerCase()}:`
            },
            {
                type: 'input',
                name: 'hour',
                message: 'Masukkan jam untuk posting (0-23):',
                validate: (input) => {
                    const hour = parseInt(input);
                    return hour >= 0 && hour <= 23 || 'Harap masukkan jam yang valid (0-23)';
                }
            },
            {
                type: 'input',
                name: 'minute',
                message: 'Masukkan menit untuk posting (0-59):',
                validate: (input) => {
                    const minute = parseInt(input);
                    return minute >= 0 && minute <= 59 || 'Harap masukkan menit yang valid (0-59)';
                }
            }
        ]);
        await scheduleUpload(scheduleType.toLowerCase(), mediaPath, caption, hour, minute);
    }
}

module.exports = { MediaSelection };