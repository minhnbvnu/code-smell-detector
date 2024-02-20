function WebPartManager_InitiateWebPartDragDrop(webPartElement) {
    var webPart = webPartElement.__webPart;
    this.UpdatePositions();
    this.dragState = new WebPartDragState(webPartElement, "move");
    var location = __wpGetPageEventLocation(window.event, true);
    var overlayContainerElement = this.overlayContainerElement;
    overlayContainerElement.style.left = location.x - webPartElement.offsetWidth / 2;
    overlayContainerElement.style.top = location.y + 4 + (webPartElement.clientTop ? webPartElement.clientTop : 0);
    overlayContainerElement.style.display = "block";
    overlayContainerElement.style.width = webPartElement.offsetWidth;
    overlayContainerElement.style.height = webPartElement.offsetHeight;
    overlayContainerElement.appendChild(webPartElement.cloneNode(true));
    if (webPart.allowZoneChange == false) {
        webPart.zone.allowDrop = true;
    }
    else {
        for (var i = 0; i < __wpm.zones.length; i++) {
            var zone = __wpm.zones[i];
            if (zone.allowLayoutChange) {
                zone.allowDrop = true;
            }
        }
    }
    document.body.attachEvent("ondragover", Zone_OnDragOver);
    return "move";
}