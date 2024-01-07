function _computeRotatedPrjExtent() {
    const coord = this._getPrjShell();
    const bbox = getDefaultBBOX();
    //cal all points center
    pointsBBOX(coord, bbox);
    const [minx, miny, maxx, maxy] = bbox;
    return new Extent(minx, miny, maxx, maxy);
}