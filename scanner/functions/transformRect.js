function transformRect(iCanvas, layer) {
    var pt, minx, miny, maxx, maxy;
    var width = layer.img.width;
    var height = layer.img.height;
    var p1 = {x: 0, y: 0};
    var p2 = {x: width, y: 0};
    var p3 = {x: 0, y: height};
    var p4 = {x: width, y: height};
    var points = [p1, p2, p3, p4];

    var t = util.transform();
    t = t.translate(iCanvas.width / 2, iCanvas.height / 2);
    t = t.append(layer.transform);
    t = t.translate(-layer.img.width / 2, -layer.img.height / 2);

    for (var i = 0; i < 4; i += 1) {
        pt = t.transformPoint(points[i]);
        if (i === 0) {
            minx = maxx = pt.x;
            miny = maxy = pt.y;
        } else {
            if (pt.x < minx) {
                minx = pt.x;
            }
            if (pt.x > maxx) {
                maxx = pt.x;
            }
            if (pt.y < miny) {
                miny = pt.y;
            }
            if (pt.y > maxy) {
                maxy = pt.y;
            }
        }
    }
    return {x: minx, y: miny, width: maxx - minx, height: maxy - miny};
}