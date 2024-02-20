function peityPie(element, radius, colors) {
    return $(element).peity('pie', {
        height: radius,
        width: radius,
        radius: radius,
        fill: colors
    });
}