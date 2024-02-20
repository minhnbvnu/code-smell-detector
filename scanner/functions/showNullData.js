function showNullData(message){
    scriptStateListDom.hide()
    var _dom = document.getElementById("dataNull");
    _dom.setInnerHtml(message || i18nProp["null_scripts"]);
    _dom.show();
}