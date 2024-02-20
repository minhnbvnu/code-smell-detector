function WebPart(webPartElement, webPartTitleElement, zone, zoneIndex, allowZoneChange) {
    this.webPartElement = webPartElement;
    this.allowZoneChange = allowZoneChange;
    this.zone = zone;
    this.zoneIndex = zoneIndex;
    this.title = ((typeof(webPartTitleElement) != "undefined") && (webPartTitleElement != null)) ?
        webPartTitleElement.innerText : "";
    webPartElement.__webPart = this;
    if ((typeof(webPartTitleElement) != "undefined") && (webPartTitleElement != null)) {
        webPartTitleElement.style.cursor = "move";
        webPartTitleElement.attachEvent("onmousedown", WebPart_OnMouseDown);
        webPartElement.attachEvent("ondragstart", WebPart_OnDragStart);
        webPartElement.attachEvent("ondrag", WebPart_OnDrag);
        webPartElement.attachEvent("ondragend", WebPart_OnDragEnd);
    }
    this.UpdatePosition = WebPart_UpdatePosition;
    this.Dispose = WebPart_Dispose;
}