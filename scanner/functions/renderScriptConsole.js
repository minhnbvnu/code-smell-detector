function renderScriptConsole(datas) {
    const scriptLogList = datas;
    scriptConsoleDom.cleanInnerHTML();
    if(scriptLogList && scriptLogList.length>0){
        scriptConsoleDom.show()
        scriptLogList.forEach(item=> {
            let data = item
            let logType = data.msgType ? data.msgType : "log"
            var _dom = document.createElement('div');
            _dom.setAttribute('class', 'console-item ' + logState[logType]);
            _dom.setAttribute('uuid', data["uuid"]);
            _dom.innerHTML = scriptLogDomTmp.replace(/(\{.+?\})/g, function ($1) { return data[$1.slice(1, $1.length - 1)] });
            scriptConsoleDom.appendChild(_dom);
        })
        if (scriptConsoleDom.children.length == 0){
            scriptConsoleDom.hide();
        }
    }else{
        scriptConsoleDom.hide();
    }
}