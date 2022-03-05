const fs = require('fs');
load();
loads();
async function load() {
    let json = JSON.parse(fs.readFileSync("memes/config.json"));
    document.getElementById("config").innerHTML = `<h2>config.yml</h2>
Ваш @<input id="username" maxlength="16" value="${json.username}"/><br />
HTTP Port <input id="port" type="number" value="${json.port}"/><br />
Первоначальный файл <input id="default" type="file" value="${json.file}"><br />
<button onclick="savecfg()">Сохранить</button>`;
}

async function loads() {
    let json = JSON.parse(fs.readFileSync("memes/gift.json"));
    let icons = JSON.parse(fs.readFileSync("gift.json"));
    let asdasd;
    for (let a in json) {
        asdasd = "";
        if (json[a].file) asdasd = `Сейчас стоит файл <b>${json[a].file}</b> <span style="color:darkred;cursor:pointer" onclick="che(${a}, true)">X</span>`;
        icons[a] = icons[a].replace(".png", "");
        let odd = document.getElementById("gifts").innerHTML;
        json[a].file = json[a].file.replaceAll("\\", "/");
        document.getElementById("gifts").innerHTML = `${odd}
        <div class="gift">
        <img class="giftimg" src="https://p16-webcast.tiktokcdn.com/img/maliva/${icons[a]}~tplv-obj.png">
        <h2>
            ${json[a].name}
        </h2>
        <p>${json[a].cost} алмазов</p>
        <input id="file-${a}" type="file" onchange="che(${a})" value="${json[a].file}" />
        
        ${asdasd}
    </div>`;
    }
}

async function savecfg() {
    let cfg = JSON.parse(fs.readFileSync("memes/config.json", "utf-8"));
    let asd;
    asd = cfg.default;
    if (document.getElementById("default").files[0].path) asd = document.getElementById("default").files[0].path;
    fs.writeFileSync("memes/config.json", JSON.stringify({
        username: document.getElementById("username").value,
        port: document.getElementById("port").value,
        default: asd
    }));
    alert("Успех!");
}
const { shell } = require('electron');
// Open a local file in the default app
var fun = function() {
    document.getElementById("err").innerHTML = "Не запустилась? Откройте сами по пути куда вы ставили программу";
    shell.openExternal('memes/start.bat');
    let asd = JSON.parse(fs.readFileSync("memes/config.json", "utf-8"));
    let prt;
    if (asd[port] != 80) {
        prt = ":80";
    } else {
        prt = "";
    }
    document.getElementById("url").innerHTML = `http://localhost${prt}/`;
}
async function che(idd, a = false) {
    let json = JSON.parse(fs.readFileSync("memes/gift.json"));
    if (a) {
        json[idd].file = "";
    } else {
        json[idd].file = document.getElementById(`file-${idd}`).files[0].path;
    }
    fs.writeFileSync("memes/gift.json", JSON.stringify(json), "utf-8");
    location.reload();
}