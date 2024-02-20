function Zone_OnDragOver() {
    var handled = __wpm.ProcessWebPartDragOver();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}