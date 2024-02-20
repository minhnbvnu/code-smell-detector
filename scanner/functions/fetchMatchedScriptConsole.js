function fetchMatchedScriptConsole(){
    browser.runtime.sendMessage({ from: "popup", operate: "fetchLog" }, (response) => {
        console.log("fetchLog response----", response)
    })
    browser.runtime.sendMessage({ from: "popup", operate: "fetchMatchedScriptLog" }, (response) => {
        logIsFetched = true;
        if (response && response.body && response.body.length > 0) {
            response.body.forEach(item => {
                if (item.logList && item.logList.length > 0) {
                    item.logList.forEach(logMsg => {
                        let logType = logMsg.msgType ? logMsg.msgType : "log"
                        let dateTime = logMsg && logMsg.time ? logMsg.time : ""
                        let data = {
                            uuid: item.uuid,
                            name: item.name,
                            time: dateTime,
                            //Fixed wrong variable logMsg.
                            msgType: logType,
                            message: logMsg.msg
                        };
                        scriptConsole.push(data)
                    })
                }
            })
            if (!showLogNotify && scriptConsole.length>0) {
                let count = scriptConsole.length
                let readCount = window.localStorage.getItem("console_count");
                readCount = readCount ? Number(readCount) : 0
                if (count - readCount > 0){
                    window.localStorage.setItem("console_count", count);
                    showLogNotify = true
                    logNotifyDom.show()
                    let showCount = count - readCount;
                    showCount = showCount > 99 ? "99+" : showCount
                    logNotifyDom.setInnerHtml(showCount)
                }
            }
        } else {
            scriptConsole = [];
        }
    })
}