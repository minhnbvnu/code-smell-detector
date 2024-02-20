function rectangleEdges(rect) {
    // Return the 4 edges coordinate of the rectangle according the the rotation
    // at the center of the rectangle.
    var distance = sjs.math.hypo(rect.w / 2, rect.h / 2);
    var angle = Math.atan2(rect.h, rect.w);
    // 4 angles to reach the edges, starting up left (down left in the sprite.js coordinate)
    // and turning counter-clockwise
    var angles = [Math.PI - angle, angle, -angle, Math.PI + angle];
    var points = [];
    for(var i=0; i < 4; i++) {
        points.push([
            distance * Math.cos(rect.angle + angles[i]) + rect.x + rect.w/2,
            distance * Math.sin(rect.angle + angles[i]) + rect.y + rect.h/2
        ]);
    }
    return points;
}