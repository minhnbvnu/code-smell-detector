function WebPartManager_CompleteWebPartDragDrop() {
    var dragState = this.dragState;
    this.dragState = null;
    if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
        dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
    }
    document.body.detachEvent("ondragover", Zone_OnDragOver);
    for (var i = 0; i < __wpm.zones.length; i++) {
        __wpm.zones[i].allowDrop = false;
    }
    this.overlayContainerElement.removeChild(this.overlayContainerElement.firstChild);
    this.overlayContainerElement.style.display = "none";
    if ((typeof(dragState) != "undefined") && (dragState != null) && (dragState.dropped == true)) {
        var currentZone = dragState.webPartElement.__webPart.zone;
        var currentZoneIndex = dragState.webPartElement.__webPart.zoneIndex;
        if ((currentZone != dragState.dropZoneElement.__zone) ||
            ((currentZoneIndex != dragState.dropIndex) &&
             (currentZoneIndex != (dragState.dropIndex - 1)))) {
            var eventTarget = dragState.dropZoneElement.__zone.uniqueID;
            var eventArgument = "Drag:" + dragState.webPartElement.id + ":" + dragState.dropIndex;
            this.SubmitPage(eventTarget, eventArgument);
        }
    }
}