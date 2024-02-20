function WebPartManager_ProcessWebPartDragEnter() {
    var dragState = __wpm.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var currentEvent = window.event;
        var newDropZoneElement = Zone_GetParentZoneElement(currentEvent.srcElement);
        if ((typeof(newDropZoneElement.__zone) == "undefined") || (newDropZoneElement.__zone == null) ||
            (newDropZoneElement.__zone.allowDrop == false)) {
            newDropZoneElement = null;
        }
        var newDropIndex = -1;
        if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
            newDropIndex = newDropZoneElement.__zone.GetWebPartIndex(__wpGetPageEventLocation(currentEvent, false));
            if (newDropIndex == -1) {
                newDropZoneElement = null;
            }
        }
        if (dragState.dropZoneElement != newDropZoneElement) {
            if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
                dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
            }
            dragState.dropZoneElement = newDropZoneElement;
            dragState.dropIndex = newDropIndex;
            if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
                newDropZoneElement.__zone.ToggleDropCues(true, newDropIndex, false);
            }
        }
        else if (dragState.dropIndex != newDropIndex) {
            if (dragState.dropIndex != -1) {
                dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
            }
            dragState.dropIndex = newDropIndex;
            if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
                newDropZoneElement.__zone.ToggleDropCues(true, newDropIndex, false);
            }
        }
        if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
            currentEvent.dataTransfer.effectAllowed = dragState.effect;
        }
        return true;
    }
    return false;
}