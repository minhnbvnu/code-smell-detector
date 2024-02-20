function WebPartManager_ProcessWebPartDrop() {
    var dragState = this.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var currentEvent = window.event;
        var dropZoneElement = Zone_GetParentZoneElement(currentEvent.srcElement);
        if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null) && (dropZoneElement.__zone.allowDrop == false)) {
            dropZoneElement = null;
        }
        if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null) && (dragState.dropZoneElement == dropZoneElement)) {
            dragState.dropped = true;
        }
        return true;
    }
    return false;
}