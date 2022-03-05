const request = require('request');
const fs = require('fs');
const unzipper = require('unzipper');
const remote = require('electron').remote
let w = remote.getCurrentWindow()

async function asd() {
    let prom = confirm("После установки, перезапустите приложение (Спустя где то 10 секунд после нажатия)");
    if (!prom) return;
    request('http://api.foxodever.com/tiktok/11.zip')
        .pipe(fs.createWriteStream('11.zip'))
        .on('close', function() {
            if (!fs.existsSync("./memes")) {
                fs.mkdirSync("./memes");
            }
            fs.createReadStream('11.zip')
                .pipe(unzipper.Extract({ path: './memes' }));
        });
}