function onDocumentMouseWheel(event) {
    const delta = -event.deltaY;

    if (delta < 0) {
        this.moves.add(MOVEMENTS.wheelup);
    } else {
        this.moves.add(MOVEMENTS.wheeldown);
    }

    this.view.notifyChange(this._camera3D, false);
}