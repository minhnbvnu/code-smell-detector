function WebPartMenu(menuLabelElement, menuDropDownElement, menuElement) {
    this.menuLabelElement = menuLabelElement;
    this.menuDropDownElement = menuDropDownElement;
    this.menuElement = menuElement;
    this.menuLabelElement.__menu = this;
    this.menuLabelElement.attachEvent('onclick', WebPartMenu_OnClick);
    this.menuLabelElement.attachEvent('onkeypress', WebPartMenu_OnKeyPress);
    this.menuLabelElement.attachEvent('onmouseenter', WebPartMenu_OnMouseEnter);
    this.menuLabelElement.attachEvent('onmouseleave', WebPartMenu_OnMouseLeave);
    if ((typeof(this.menuDropDownElement) != "undefined") && (this.menuDropDownElement != null)) {
        this.menuDropDownElement.__menu = this;
    }
    this.menuItemStyle = "";
    this.menuItemHoverStyle = "";
    this.popup = null;
    this.hoverClassName = "";
    this.hoverColor = "";
    this.oldColor = this.menuLabelElement.style.color;
    this.oldTextDecoration = this.menuLabelElement.style.textDecoration;
    this.oldClassName = this.menuLabelElement.className;
    this.Show = WebPartMenu_Show;
    this.Hide = WebPartMenu_Hide;
    this.Hover = WebPartMenu_Hover;
    this.Unhover = WebPartMenu_Unhover;
    this.Dispose = WebPartMenu_Dispose;
    var menu = this;
    this.disposeDelegate = function() { menu.Dispose(); };
    window.attachEvent('onunload', this.disposeDelegate);
}