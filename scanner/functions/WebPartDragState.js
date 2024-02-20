function WebPartDragState(webPartElement, effect) {
    this.webPartElement = webPartElement;
    this.dropZoneElement = null;
    this.dropIndex = -1;
    this.effect = effect;
    this.dropped = false;
}