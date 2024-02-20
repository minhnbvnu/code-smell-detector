function startRun() {
    chrome.storage.local.get(["studySubjectConfig", "paperAskDoes", "weekAskDoes", "studyWindowId", "studyTabId"], function (result) {
        logMessage("startRun begin, studyWindowId is: " + result.studyWindowId);
        if (result.studyWindowId && result.studyTabId) {
            // 获取积分数据
            fetch(StudyConfig.scoreApi)
                .then((response) => response.json())
                .then(function (requestData) {
                    logMessage(requestData);
                    if (requestData.hasOwnProperty("code") && parseInt(requestData.code) === 200) {

                        pointData = requestData.data;

                        // 浏览器扩展图标
                        chrome.action.setBadgeText({ "text": pointData.totalScore.toString() });

                        // 获取请求类型
                        let type;
                        type = getTypeByPoint(pointData.taskProgress, result.studySubjectConfig, result.paperAskDoes, result.weekAskDoes);
                        logMessage("type is: " + type);
                        if (typeof (type) != "undefined" && type != null) {
                            (async () => {
                                const url = await getUrlByType(type);
                                if (typeof (url) != "undefined" && url != null) {
                                    chrome.tabs.sendMessage(result.studyTabId, {
                                        "type": "redirect",
                                        "url": url
                                    });
                                } else {
                                    // 定时重新执行
                                    setTimeout(startRun, Math.floor(10000 + Math.random() * 30 * 1000));
                                    // 获取页面失败
                                    noticeMessage(chrome.i18n.getMessage("extChannelApi"), chrome.i18n.getMessage("extUpdate"));
                                }
                            })();
                        } else {
                            setTimeout(stopStudy, Math.floor(5000 + Math.random() * 1000));
                        }
                    } else {
                        // 跳转登录页面
                        chrome.tabs.update(studyTabId, { "active": true, "url": StudyConfig.loginUrl + "?ref=" + StudyConfig.points });
                    }
                })
                .catch(error => function (error) {
                    logMessage(error);
                    // 定时重新执行
                    setTimeout(startRun, Math.floor(10000 + Math.random() * 30 * 1000));
                });
        }
    });

    return true;
}