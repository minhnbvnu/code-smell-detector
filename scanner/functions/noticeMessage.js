function noticeMessage(title, message = "") {
    chrome.notifications.create({
        "type": "basic",
        "iconUrl": "img/icon/icon_128x128.png",
        "title": title,
        "message": message
    }, function (notificationId) {
        setTimeout(function () {
            chrome.notifications.clear(notificationId);
        }, 5000);
    });
}