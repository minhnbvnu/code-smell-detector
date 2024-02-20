function watchDrags(element, grabHandler, cancelHandler, dragHandler, dropHandler) {
    return new DragWatcher(element, grabHandler, cancelHandler, dragHandler, dropHandler)
        .addListenersUntilResultInvoked();
}