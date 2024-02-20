function peityLine(element, height, width, color) {
    return $(element).peity('line', {
        height: height,
        width: width,
        fill: color,
        stroke: color
    });
}