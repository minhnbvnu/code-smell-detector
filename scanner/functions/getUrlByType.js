async function getUrlByType(type) {
    let url;

    if (type == "paper") {
        url = StudyConfig.paperAskUrl;
    } else if (type == "week") {
        url = StudyConfig.weekAskUrl;
    } else if (type == "day") {
        url = StudyConfig.dayAskUrl;
    } else {
        let key;
        if (type == "article") {
            key = ArrayRandom(StudyConfig.articleUrl);
        } else {
            key = ArrayRandom(StudyConfig.videoUrl);
        }
        try {
            const response = await fetch(StudyConfig.channelApi + key + ".json?_st=" + Math.floor(Date.now() / 6e4) + "&js_v=1681882424082");
            const urlData = await response.json();

            logMessage(urlData);

            let urlList = [];
            let urlTemp;
            let publishTime;
            for (key in urlData) {
                if (!urlData.hasOwnProperty(key)) {
                    continue;
                }
                if (urlData[key].hasOwnProperty("url")) {
                    urlTemp = urlData[key].url;

                    // 判断发布时间是否是365天之内，如果没有，判断url规则
                    if (urlData[key].hasOwnProperty("publishTime")) {
                        publishTime = new Date(urlData[key].publishTime);
                        var lastYear = new Date(new Date() - 100 * 86400000);
                        if (publishTime < lastYear) {
                            continue;
                        }
                    } else {
                        if (urlTemp.indexOf("lgpage/detail/index") === -1) {
                            continue;
                        }
                    }

                    if (urlList.indexOf(urlTemp) === -1) {
                        urlList.push(urlTemp);
                    }
                }
            }
            if (urlList.length) {
                url = ArrayRandom(urlList);
            }

        } catch (error) {
            logMessage("fetch getUrlByType error.")
            logMessage(error);
        }
    }

    return url;
}