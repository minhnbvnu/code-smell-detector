function WebPartManager_DragDrop() {
    if ((typeof(this.draggedWebPart) != "undefined") && (this.draggedWebPart != null)) {
        var tempWebPart = this.draggedWebPart;
        this.draggedWebPart = null;
        tempWebPart.dragDrop();
        window.setTimeout("__wpClearSelection()", 0);
    }
}