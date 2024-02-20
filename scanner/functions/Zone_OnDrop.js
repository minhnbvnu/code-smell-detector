function Zone_OnDrop() {
    var handled = __wpm.ProcessWebPartDrop();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}