function computeExtent(fn) {
    const coordinates = this[fn]();
    if (!coordinates) {
        return null;
    }
    return new Extent(coordinates, coordinates, this._getProjection());
}