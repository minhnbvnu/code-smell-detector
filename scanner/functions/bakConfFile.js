function bakConfFile(file) {
    mkdirConfigBakDir();
    let date = new Date();
    let bakConfFile = confBakDir + file + '_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getMilliseconds();
    let oldConfContent = "";
    switch (file) {
        case "cookie.sh":
            oldConfContent = getFileContentByName(ckFile);
            fs.writeFileSync(bakConfFile, oldConfContent);
            break;
        case "config.sh":
            oldConfContent = getFileContentByName(confFile);
            fs.writeFileSync(bakConfFile, oldConfContent);
            break;
        case "crontab.list":
            oldConfContent = getFileContentByName(crontabFile);
            fs.writeFileSync(bakConfFile, oldConfContent);
            break;
        case "diy.sh":
            oldConfContent = getFileContentByName(diyFile);
            fs.writeFileSync(bakConfFile, oldConfContent);
            break;
        default:
            break;
    }

}