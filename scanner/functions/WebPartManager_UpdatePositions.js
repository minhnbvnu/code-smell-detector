function WebPartManager_UpdatePositions() {
    for (var i = 0; i < this.zones.length; i++) {
        this.zones[i].UpdatePosition();
    }
}