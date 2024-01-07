function getVectorMarkerPoints(markerType, width, height) {
    //half height and half width
    const hh = height / 2,
        hw = width / 2;
    const left = 0,
        top = 0;
    let v0, v1, v2, v3;
    if (markerType === 'triangle') {
        v0 = new Point(left, top - hh);
        v1 = new Point(left - hw, top + hh);
        v2 = new Point(left + hw, top + hh);
        return [v0, v1, v2];
    } else if (markerType === 'cross') {
        v0 = new Point((left - hw), top);
        v1 = new Point((left + hw), top);
        v2 = new Point((left), (top - hh));
        v3 = new Point((left), (top + hh));
        return [v0, v1, v2, v3];
    } else if (markerType === 'diamond') {
        v0 = new Point((left - hw), top);
        v1 = new Point(left, (top - hh));
        v2 = new Point((left + hw), top);
        v3 = new Point((left), (top + hh));
        return [v0, v1, v2, v3];
    } else if (markerType === 'square') {
        v0 = new Point((left - hw), (top + hh));
        v1 = new Point((left + hw), (top + hh));
        v2 = new Point((left + hw), (top - hh));
        v3 = new Point((left - hw), (top - hh));
        return [v0, v1, v2, v3];
    } else if (markerType === 'rectangle') {
        v0 = new Point(left, top);
        v1 = v0.add(width, 0);
        v2 = v0.add(width, height);
        v3 = v0.add(0, height);
        return [v0, v1, v2, v3];
    } else if (markerType === 'x') {
        v0 = new Point(left - hw, top + hh);
        v1 = new Point(left + hw, top - hh);
        v2 = new Point(left + hw, top + hh);
        v3 = new Point(left - hw, top - hh);
        return [v0, v1, v2, v3];
    } else if (markerType === 'bar') {
        v0 = new Point((left - hw), (top - height));
        v1 = new Point((left + hw), (top - height));
        v2 = new Point((left + hw), top);
        v3 = new Point((left - hw), top);
        return [v0, v1, v2, v3];
    } else if (markerType === 'pin' || markerType === 'pie') {
        const extWidth = height * Math.atan(hw / hh);
        v0 = new Point(left, top);
        v1 = new Point(left - extWidth, top - height);
        v2 = new Point(left + extWidth, top - height);
        v3 = new Point(left, top);
        return [v0, v1, v2, v3];
    }
    return [];
}