function rectUnite(r1, r2) {
    var x = Math.min(r1.x, r2.x),
        y = Math.min(r1.y, r2.y),
        width = Math.max(r1.x + r1.width, r2.x + r2.width) - x,
        height = Math.max(r1.y + r1.height, r2.y + r2.height) - y;
    return {x: x, y: y, width: width, height: height};
}