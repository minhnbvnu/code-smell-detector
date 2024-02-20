function WebPart_OnMouseDown() {
    var currentEvent = window.event;
    var draggedWebPart = WebPart_GetParentWebPartElement(currentEvent.srcElement);
    if ((typeof(draggedWebPart) == "undefined") || (draggedWebPart == null)) {
        return;
    }
    document.selection.empty();
    try {
        __wpm.draggedWebPart = draggedWebPart;
        __wpm.DragDrop();
    }
    catch (e) {
        __wpm.draggedWebPart = draggedWebPart;
        window.setTimeout("__wpm.DragDrop()", 0);
    }
    currentEvent.returnValue = false;
    currentEvent.cancelBubble = true;
}