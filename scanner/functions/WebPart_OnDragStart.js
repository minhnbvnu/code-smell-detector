function WebPart_OnDragStart() {
    var currentEvent = window.event;
    var webPartElement = currentEvent.srcElement;
    if ((typeof(webPartElement.__webPart) == "undefined") || (webPartElement.__webPart == null)) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
        return;
    }
    var dataObject = currentEvent.dataTransfer;
    dataObject.effectAllowed = __wpm.InitiateWebPartDragDrop(webPartElement);
}