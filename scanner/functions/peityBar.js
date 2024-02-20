function peityBar(element, height, width, color) {
    return $(element).peity('bar', {
        height: height,
        width: width,
        fill: [color]
    });
}