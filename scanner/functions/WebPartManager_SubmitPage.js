function WebPartManager_SubmitPage(eventTarget, eventArgument) {
    if ((typeof(this.menu) != "undefined") && (this.menu != null)) {
        this.menu.Hide();
    }
    __doPostBack(eventTarget, eventArgument);
}