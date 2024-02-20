function prefixPointerEvent(pointerEvent) {
        return window.MSPointerEvent ?
            'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10):
            pointerEvent;
    }