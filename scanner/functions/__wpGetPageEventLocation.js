function __wpGetPageEventLocation(event, includeScroll) {
    if ((typeof(event) == "undefined") || (event == null)) {
        event = window.event;
    }
    return __wpTranslateOffset(event.offsetX, event.offsetY, event.srcElement, null, includeScroll);
}