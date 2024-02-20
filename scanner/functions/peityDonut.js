function peityDonut(element, radius, colors) {
    return $(element).peity('donut', {
        width: radius,
        radius: radius,
        fill: colors
    });
}