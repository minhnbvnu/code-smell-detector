function pre3dTilesUpdate() {
    if (!this.visible) {
        return [];
    }

    // Elements removed are added in the layer._cleanableTiles list.
    // Since we simply push in this array, the first item is always
    // the oldest one.
    const now = Date.now();
    if (this._cleanableTiles.length
        && (now - this._cleanableTiles[0].cleanableSince) > this.cleanupDelay) {
        // Make sure we don't clean root tile
        this.root.cleanableSince = undefined;

        let i = 0;
        for (; i < this._cleanableTiles.length; i++) {
            const elt = this._cleanableTiles[i];
            if ((now - elt.cleanableSince) > this.cleanupDelay) {
                cleanup3dTileset(this, elt);
            } else {
                // later entries are younger
                break;
            }
        }
        // remove deleted elements from _cleanableTiles
        this._cleanableTiles.splice(0, i);
    }

    return [this.root];
}