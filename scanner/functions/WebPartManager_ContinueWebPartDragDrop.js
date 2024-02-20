function WebPartManager_ContinueWebPartDragDrop() {
    var dragState = this.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var style = this.overlayContainerElement.style;
        var location = __wpGetPageEventLocation(window.event, true);
        style.left = location.x - dragState.webPartElement.offsetWidth / 2;
        style.top = location.y + 4 + (dragState.webPartElement.clientTop ? dragState.webPartElement.clientTop : 0);
    }
}