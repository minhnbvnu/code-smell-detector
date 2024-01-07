function calCanvasSize(size, devicePixelRatio = 1) {
    const { width, height } = size;
    CANVAS_SIZE_TEMP.cssWidth = width + 'px';
    CANVAS_SIZE_TEMP.cssHeight = height + 'px';
    CANVAS_SIZE_TEMP.width = Math.round(width * devicePixelRatio);
    CANVAS_SIZE_TEMP.height = Math.round(height * devicePixelRatio);
    return CANVAS_SIZE_TEMP;
}