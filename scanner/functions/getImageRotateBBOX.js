function getImageRotateBBOX(width, height, rad) {
    /**
     * p1(0,0)
     * p2(0,height)
     * p3(width,height)
     * p4(width,0)
     *
     * p1 --------- p4
     * |            |
     * |            |
     * |            |
     * p2 --------- p3
     */
    const rad2 = Math.PI / 2 + rad;
    const rad3 = Math.PI / 4 + rad;
    const rad4 = rad;

    const r2 = height;
    const r3 = Math.sqrt(width * width + height * height);
    const r4 = width;


    const p1x = 0, p1y = 0;
    const p2x = Math.cos(rad2) * r2, p2y = Math.sin(rad2) * r2;
    const p3x = Math.cos(rad3) * r3, p3y = Math.sin(rad3) * r3;
    const p4x = Math.cos(rad4) * r4, p4y = Math.sin(rad4) * r4;
    const minx = Math.min(p2x, p3x, p4x, p1x);
    const miny = Math.min(p2y, p3y, p4y, p1y);
    const maxx = Math.max(p2x, p3x, p4x, p1x);
    const maxy = Math.max(p2y, p3y, p4y, p1y);
    return [minx, miny, maxx - minx, maxy - miny];
}