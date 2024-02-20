function onDocumentMouseDown(event) {
    event.preventDefault();
    this._isMouseDown = true;

    const coords = this.view.eventToViewCoords(event);
    this._onMouseDownMouseX = coords.x;
    this._onMouseDownMouseY = coords.y;
}