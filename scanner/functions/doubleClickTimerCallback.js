function doubleClickTimerCallback(grid, event) {
    this.doubleClickTimer = undefined;
    this.dragging = true;
    this.extendSelection(grid, event.gridCell.x, event.primitiveEvent.detail.keys);
}