function Zone(zoneElement, zoneIndex, uniqueID, isVertical, allowLayoutChange, highlightColor) {
    var webPartTable = null;
    if (zoneElement.rows.length == 1) {
        webPartTableContainer = zoneElement.rows[0].cells[0];
    }
    else {
        webPartTableContainer = zoneElement.rows[1].cells[0];
    }
    var i;
    for (i = 0; i < webPartTableContainer.childNodes.length; i++) {
        var node = webPartTableContainer.childNodes[i];
        if (node.tagName == "TABLE") {
            webPartTable = node;
            break;
        }
    }
    this.zoneElement = zoneElement;
    this.zoneIndex = zoneIndex;
    this.webParts = new Array();
    this.uniqueID = uniqueID;
    this.isVertical = isVertical;
    this.allowLayoutChange = allowLayoutChange;
    this.allowDrop = false;
    this.webPartTable = webPartTable;
    this.highlightColor = highlightColor;
    this.savedBorderColor = (webPartTable != null) ? webPartTable.style.borderColor : null;
    this.dropCueElements = new Array();
    if (webPartTable != null) {
        if (isVertical) {
            for (i = 0; i < webPartTable.rows.length; i += 2) {
                this.dropCueElements[i / 2] = webPartTable.rows[i].cells[0].childNodes[0];
            }
        }
        else {
            for (i = 0; i < webPartTable.rows[0].cells.length; i += 2) {
                this.dropCueElements[i / 2] = webPartTable.rows[0].cells[i].childNodes[0];
            }
        }
    }
    this.AddWebPart = Zone_AddWebPart;
    this.GetWebPartIndex = Zone_GetWebPartIndex;
    this.ToggleDropCues = Zone_ToggleDropCues;
    this.UpdatePosition = Zone_UpdatePosition;
    this.Dispose = Zone_Dispose;
    webPartTable.__zone = this;
    webPartTable.attachEvent("ondragenter", Zone_OnDragEnter);
    webPartTable.attachEvent("ondrop", Zone_OnDrop);
}