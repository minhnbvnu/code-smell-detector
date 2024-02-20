function WebPartMenu_Hide() {
    if (__wpm.menu == this) {
        __wpm.menu = null;
        if ((typeof(this.popup) != "undefined") && (this.popup != null)) {
            this.popup.hide();
            this.popup = null;
        }
    }
}