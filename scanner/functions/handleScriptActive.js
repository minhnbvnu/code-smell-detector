function handleScriptActive(uuid, active) {
    if (uuid && uuid != "" && typeof uuid == "string") {
        
        browser.runtime.sendMessage({
            from: "popup",
            operate: "setScriptActive",
            uuid: uuid,
            active: !active
        }, (response) => {
            console.log("setScriptActive response,",response)
        })
        if (!active) {
            refreshTargetTabs();
        }
        // 改变数据active状态
        scriptStateList.forEach(function (item, index) {
            if(uuid == item.uuid){
                item.active = !active
                item.manually = "0";
            }
        })
        renderScriptContent(scriptStateList)
    }
}