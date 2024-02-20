function saveNewConf(file, content) {
    bakConfFile(file);
    switch (file) {
        case "cookie.sh":
            fs.writeFileSync(ckFile, content);
            break;
        case "config.sh":
            fs.writeFileSync(confFile, content);
            break;
        case "crontab.list":
            fs.writeFileSync(crontabFile, content);
            execSync('crontab ' + crontabFile);
            break;
        case "diy.sh":
            fs.writeFileSync(diyFile, content);
            break;
        default:
            break;
    }
}