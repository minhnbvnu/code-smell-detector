function getFont(fontWeight, request) {
    return fontWeight + " " + request.fontSize * request.devicePixelRatio + "px " + request.fontFamily;
}