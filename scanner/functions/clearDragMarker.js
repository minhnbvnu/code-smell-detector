function clearDragMarker() {
        clearInterval(timerId);
        editor.session.removeMarker(dragSelectionMarker);
        dragSelectionMarker = null;
        editor.selection.fromOrientedRange(range);
        if (editor.isFocused() && !isInternal)
            editor.renderer.$cursorLayer.setBlinking(!editor.getReadOnly());
        range = null;
        dragCursor = null;
        counter = 0;
        autoScrollStartTime = null;
        cursorMovedTime = null;
        event.removeListener(document, "mousemove", onMouseMove);
    }