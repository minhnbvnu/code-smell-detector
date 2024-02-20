function isAnchor(e) {
    var mousePos = getMousePos(canvas, e);
    var rectLeft = getRelativeX();
    var rectTop = getRelativeY();
    var rectRight = rectLeft + objectWidth;
    var rectBottom = rectTop + objectHeight;

    if (boxSideCheck(mousePos, rectRight - BOX_ANCHOR, rectRight + BOX_ANCHOR, rectBottom - BOX_ANCHOR, rectBottom + BOX_ANCHOR)) {
        $(canvas).css("cursor", "se-resize");
        if (boxResizeData != null) boxResizeMode = BOX_RESIZE_TYPE.Corner;
        return true;
    } else if (boxSideCheck(mousePos, rectRight, rectRight, rectTop, rectBottom - BOX_ANCHOR)) {
        $(canvas).css("cursor", "w-resize");
        if (boxResizeData != null) boxResizeMode = BOX_RESIZE_TYPE.Right;
        return true;
    } else if (boxSideCheck(mousePos, rectLeft, rectRight - BOX_ANCHOR, rectBottom, rectBottom)) {
        $(canvas).css("cursor", "s-resize");
        if (boxResizeData != null) boxResizeMode = BOX_RESIZE_TYPE.Bottom;
        return true;
    } else {
        $(canvas).css("cursor", "default");
        return false;
    }
}