function renderRegisterMenuContent(uuid, datas) {
    const menuItemList = datas;
    registerMenuConDom.cleanInnerHTML();
    if (menuItemList && menuItemList.length > 0) {
        noneMenuDom.hide()
        registerMenuConDom.show()
        menuItemList.forEach(function (item, idnex, array) {
            var data = item;
            data.uuid = uuid;
            var _dom = document.createElement('div');
            _dom.innerHTML = registerMenuItemTemp.replace(/(\{.+?\})/g, function ($1) { return data[$1.slice(1, $1.length - 1)] });
            registerMenuConDom.appendChild(_dom.childNodes[0]);
        })
        registerMenuConDom.addEventListener("click", function (e) {
            let target = e.target;
            if (target && target.nodeName.toLowerCase() == "div" && target.className.toLowerCase() == "menu-item"){
                let menuId = target.getAttribute("menu-id");
                let uuid = target.getAttribute("uuid");
                handleRegisterMenuClickAction(menuId, uuid)
            }
        })
    } else {
        noneMenuDom.show();
        registerMenuConDom.hide()
    }
}