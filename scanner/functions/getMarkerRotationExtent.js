function getMarkerRotationExtent(out, rad, width, height, dxdy, alignPoint) {
    const x = dxdy.x + alignPoint.x, y = dxdy.y + alignPoint.y;
    TEMP_DXDYPOINT.x = x;
    TEMP_DXDYPOINT.y = y;
    //dxdy rad
    const dxdyRad = getDxDyRad(TEMP_DXDYPOINT);
    //dxdy的半径
    const radius = Math.sqrt(x * x + y * y);
    //dydy 在 markerRaotation下的像素点新的位置
    /**
     *     p
     *     /\
     *    /  \
     *   /    \
     *  /      \
     * /        \
     * dxdy    rxry
     */
    const rx = Math.cos(rad + dxdyRad) * radius, ry = Math.sin(rad + dxdyRad) * radius;
    //p像素点平移到 rxry所在的像素点
    let minx = 0, miny = 0;
    minx += rx;
    miny += ry;
    //计算旋转图形后新的图形的BBOX
    const [offsetX, offsetY, w, h] = getImageRotateBBOX(width, height, rad, alignPoint);
    minx += offsetX;
    miny += offsetY;
    const maxx = minx + Math.max(width, w), maxy = miny + Math.max(height, h);
    out.set(minx, miny, maxx, maxy);
    return out;
}