function WebPartMenu_Hover() {
    if (this.labelHoverClassName != "") {
        this.menuLabelElement.className = this.menuLabelElement.className + " " + this.labelHoverClassName;
    }
    if (this.labelHoverColor != "") {
        this.menuLabelElement.style.color = this.labelHoverColor;
    }
}