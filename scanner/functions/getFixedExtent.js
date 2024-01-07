function getFixedExtent(out, dx, dy, rotation, alignPoint, w, h) {
    const dxdy = DXDY.set(dx, dy);
    if (rotation) {
        return getMarkerRotationExtent(out, rotation, w, h, dxdy, alignPoint);
    }
    const result = out.set(dxdy.x, dxdy.y, dxdy.x + w, dxdy.y + h);
    result._add(alignPoint);
    if (rotation) {
        rotateExtent(result, rotation);
    }

    return result;
}