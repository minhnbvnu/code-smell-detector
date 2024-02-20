function calcLayerRect(iCanvas, layer) {
    var rect = transformRect(iCanvas, layer);
    rect = rectIntersect(rect, {x: 0, y: 0, width: iCanvas.width, height: iCanvas.height});
    return { x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height)};
}