function contourToString(contour) {
    return '<pre class="contour">' + contour.map(function (point) {
        return '<span class="' + (point.onCurve ? 'on' : 'off') + 'curve">x=' + point.x + ' y=' + point.y + '</span>';
    }).join('\n') + '</pre>';
}