function WebPartManager_AddZone(zoneElement, uniqueID, isVertical, allowLayoutChange, highlightColor) {
    var zoneIndex = this.zones.length;
    var zone = new Zone(zoneElement, zoneIndex, uniqueID, isVertical, allowLayoutChange, highlightColor);
    this.zones[zoneIndex] = zone;
    return zone;
}