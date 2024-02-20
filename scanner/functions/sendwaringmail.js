function sendwaringmail(msg) {
    tools.sendMail("知乎爬虫cookie错误", tools.getDateTimeString() + "<br/>" + msg, function (err) {
        if (err) logger.error("Send cookie error mail error : " + err);
        else logger.error("Cookie error. Alert mail has sent.");
    });
}