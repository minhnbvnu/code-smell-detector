function handleScriptRegisterMenu(uuid) {
    let registerMenuPopupDom = document.getElementById("registerMenuPopup");
    registerMenuPopupDom.style.display = "block";
    document.getElementById("registerMenuWarpper").className = "register-menu-warpper filter-form-show";
    registerMenuConDom = document.getElementById("registerMenuCon");
    noneMenuDom = document.getElementById("noneMenu");
    noneMenuDom.addEventListener("click", function (e) {
        closeMenuPopup(e)
    })
    browser.runtime.sendMessage({ from: "popup", uuid: uuid, operate: "fetchRegisterMenuCommand" });
    if (!uuid){
        registerMenuConDom.hide()
        noneMenuDom.show();
        return;
    }

}