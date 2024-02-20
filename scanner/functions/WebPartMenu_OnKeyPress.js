function WebPartMenu_OnKeyPress() {
    if (window.event.keyCode == 13) {
        var menu = window.event.srcElement.__menu;
        if ((typeof(menu) != "undefined") && (menu != null)) {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
            menu.Show();
        }
    }
}