function stopStudy() {
    // 获取数据，判断执行
    chrome.storage.local.get(["studyWindowId"], function (result) {
        logMessage("stopStudy begin, studyWindowId is: " + result.studyWindowId);
        if (result.studyWindowId) {
            // 关闭窗口
            chrome.windows.remove(result.studyWindowId, function () {
                noticeMessage(chrome.i18n.getMessage("extFinish"));
                logMessage("stopStudy success.");
            });
            // 重置参数
            chrome.storage.local.remove(["studyWindowId", "studyTabId"]);
            chrome.action.setBadgeText({ text: "" });
        }
    });
    return true;
}