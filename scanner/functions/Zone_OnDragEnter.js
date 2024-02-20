function Zone_OnDragEnter() {
    var handled = __wpm.ProcessWebPartDragEnter();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}