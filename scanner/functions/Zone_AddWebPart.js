function Zone_AddWebPart(webPartElement, webPartTitleElement, allowZoneChange) {
    var webPart = null;
    var zoneIndex = this.webParts.length;
    if (this.allowLayoutChange && __wpm.IsDragDropEnabled()) {
        webPart = new WebPart(webPartElement, webPartTitleElement, this, zoneIndex, allowZoneChange);
    }
    else {
        webPart = new WebPart(webPartElement, null, this, zoneIndex, allowZoneChange);
    }
    this.webParts[zoneIndex] = webPart;
    return webPart;
}