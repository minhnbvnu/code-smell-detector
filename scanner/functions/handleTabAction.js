function handleTabAction(target, type) {
    if (typeof type != "undefined" && type > 0) {
        document.getElementsByClassName("active-tab")[0].classList.remove("active-tab"); // 删除之前已选中tab的样式
        target.classList.add('active-tab'); // 给当前选中tab添加样式
        if(type == 1){
            scriptStateListDom.show();
            scriptConsoleDom.hide();
        }else{
            showLogNotify = false;
            logNotifyDom.hide()
            scriptStateListDom.hide();
            scriptConsoleDom.show();
            fetchAndRenderConsoleLog()
        }
    }
}