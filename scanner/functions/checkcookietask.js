function checkcookietask() {
    if (!isMainTaskRunning) {
        cookies.getCookie(function (err, c, x) {//获取cookie，如出错则发送邮件通知
            if (err || !c || !x) {
                if (!cookieError) {
                    sendwaringmail(err);//如果是第一次出错则发邮件通知
                    cookieError = true;
                }
                else
                    logger.debug("Cookie still error, please fix it ASAP.");
            }
            else {
                if (cookieError) {
                    //如果已修复则发送邮件并重置状态，下个任务会自动执行
                    sendresumemail();
                    cookieError = false;
                }
                else
                    logger.debug("Check cookie successfully.");
            }
        })
    }
    setTimeout(checkcookietask, 10 * 60000);//每10分钟检查一次，主任务运行时除外
}