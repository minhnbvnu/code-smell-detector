function renderScriptContent(datas) {
    const scriptList = datas;
    scriptStateListDom.cleanInnerHTML();
    if (scriptList && scriptList.length>0){
        scriptStateListDom.show()
        document.getElementById("dataNull").hide()
        scriptList.forEach(function (item, idnex, array) {
            var data = item; 
            let uuid = data["uuid"];
            let grants = data.grants
            let showMenu = grants && grants.length > 0 && (grants.includes("GM.registerMenuCommand") || grants.includes("GM_registerMenuCommand")) ? "block":"none"
            data.showMenu = showMenu
            data.showIcon = data.icon?"inline":"none";
            let index = item.active ? 1 : 0;
            data.status = item.active ? i18nProp["state_actived"] : i18nProp["state_stopped"];
            if (data.manually == "1"){
                if (!item.active){
                    data.status = i18nProp["state_manually"];
                    index = 2;
                }
            }else{
                data.manually = "0"
            }
            let showManually = !item.active ? "block":"none"
            data.showManually = showManually;
            var _dom = document.createElement('div');
            
            _dom.setAttribute('class', 'content-item ' + scriptState[index]);
            _dom.setAttribute('uuid', uuid);
            _dom.setAttribute('author', data["author"]);
            _dom.innerHTML = scriptDomTmp.replace(/(\{.+?\})/g, function ($1) { return data[$1.slice(1, $1.length - 1)] });
            scriptStateListDom.appendChild(_dom);
        })
    }else{
        showNullData(i18nProp["null_scripts"]);
    }
}