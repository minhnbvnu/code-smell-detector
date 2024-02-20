function startStudy() {
    // 获取数据，判断执行
    chrome.storage.local.get(["studyWindowId", "loginToken"], function (result) {
        logMessage("startStudy begin, studyWindowId is: " + result.studyWindowId + ", loginToken is: " + result.loginToken);
        if (!result.studyWindowId) {
            chrome.windows.create({
                "url": StudyConfig.points,
                "type": "popup",
                // "state": "fullscreen"
                "top": 0,
                "left": 0,
                "width": 350,
                "height": 350
            }, function (window) {
                let tabid = window.tabs[window.tabs.length - 1].id;
                chrome.storage.local.set({
                    "studyWindowId": window.id,
                    "studyTabId": tabid,
                    "weekAskDoes": 0,
                    "paperAskDoes": 0
                }, function () {
                    if (result.loginToken) {
                        chrome.tabs.get(tabid, (tab) => {
                            chrome.cookies.set({
                                domain: ".xuexi.cn",
                                expirationDate: Date.now() / 1000 + 10,
                                name: "token",
                                path: "/",
                                url: tab.url,
                                value: result.loginToken,
                            }, ()=> {
                                logMessage("reload token " + result.loginToken)
                            })
                        })
                    }
                    // 静音处理
                    chrome.tabs.update(tabid, { "muted": true });
                    // 开始学习
                    noticeMessage(chrome.i18n.getMessage("extWorking"), chrome.i18n.getMessage("extWarning"));
                });
            });
        } else {
            // 学习中
            noticeMessage(chrome.i18n.getMessage("extWorking"), chrome.i18n.getMessage("extLearning"));

            // 设置焦点
            chrome.windows.update(result.studyWindowId, { "focused": true });
        }
    });
    return true;
}