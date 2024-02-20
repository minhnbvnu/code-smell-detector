function sendresumemail() {
    tools.sendMail("知乎爬虫状态已恢复正常", tools.getDateTimeString(), function (err) {
        if (err) logger.error("Send cookie resume mail error : " + err);
        else logger.log("Cookie resumed. Next task will start after " + tools.getDateTimeString(new Date(nextStartTime)));
    });
}