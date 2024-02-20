function main() {
    //处理传入参数
    if (process.argv.length > 2) {
        var argv = new Array();
        for (var i = 2; i < process.argv.length; i++) {
            argv.push(process.argv[i].trim().toLowerCase());
        }
        if (argv.indexOf("-i") != -1)//加参数-i则1秒后立即启动，否则按指定时间启动
            nextStartTime = new Date().getTime() + 1000;
        if (argv.indexOf("-ng") != -1)//加参数-n则跳过刷新用户列表的阶段(Get new user)
            ng = true;
        if (argv.indexOf("-ns") != -1)//加参数-s则跳过读取快照的阶段(user Snapshot)
            ns = true;
        if (argv.indexOf("-nf") != -1)//加参数-f则跳过保存文件的阶段(save view File)
            nf = true;
        if (argv.indexOf("-db") != -1)//加参数-db则显示调试代码(DeBug)
            logger.enabledebug();
    }

    if (!nextStartTime) {
        nextStartTime = Date.parse(new Date().toDateString() + " " + taskStartTime);//默认为今天的此时间
        while (new Date().getTime() > nextStartTime) {//如果现在已经超过此时间，则加一天后再比较
            nextStartTime += 24 * 3600 * 1000;
        }
    }
    logger.log("First task will start after " + tools.getDateTimeString(new Date(nextStartTime)));

    maintask();
    setTimeout(checkcookietask, 1000);
}