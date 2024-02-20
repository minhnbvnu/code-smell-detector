function checkConfigFile() {
    if (!fs.existsSync(sampleFile)) {
        console.error('脚本启动失败，config.sh.sample 文件不存在！');
        process.exit(1);
    }
}