function maintask() {
    //满足以下三种条件之一时继续等待
    //1.当前运行中  2.时间未到  3.cookie出错，不能执行任务
    if (isMainTaskRunning || new Date().getTime() < nextStartTime || cookieError) {
        setTimeout(maintask, 1000);
        return;
    }
    //任务开始
    isMainTaskRunning = true;
    logger.log("Task " + taskNo + " start.");
    logger.log("Get cookie and session id.");
    cookies.getCookie(function (err, c, x) {//获取cookie错误的话，停止任务执行
        if (err || !c || !x) {
            cookieError = true;
            sendwaringmail("Cookie错误导致任务取消.<br/>" + err);
            logger.error("Task " + taskNo + " canceled.");
            db.end();
            isMainTaskRunning = false;
            maintask();
            return;
        }
        cookie = c;
        xsrf = x;
        //按顺序执行任务
        startgetnewuser(function () {
            startusersnapshot(function (err) {
                if (err)
                    logger.error("Get snapshot error:" + err);
                startsaveviewfile(err, function () {
                    logger.log("Task " + taskNo + " finished");
                    //完成后准备下次任务
                    nextStartTime = Date.parse(new Date().toDateString() + " " + taskStartTime) + 24 * 3600 * 1000;//在次日的指定时间执行

                    taskNo++;
                    logger.log("Next task will start after " + tools.getDateTimeString(new Date(nextStartTime)));
                    db.end();
                    isMainTaskRunning = false;
                    maintask();
                });
            });
        });
    });
}