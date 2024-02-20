function WebPartMenu_Dispose() {
    this.menuLabelElement.__menu = null;
    this.menuDropDownElement.__menu = null;
    window.detachEvent('onunload', this.disposeDelegate);
}