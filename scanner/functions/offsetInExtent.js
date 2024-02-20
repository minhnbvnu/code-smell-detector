function offsetInExtent(point, extent, target = new THREE.Vector2()) {
    if (point.crs != extent.crs) {
        throw new Error(`Unsupported mix: ${point.crs} and ${extent.crs}`);
    }

    extent.planarDimensions(dimension);

    const originX = (point.x - extent.west) / dimension.x;
    const originY = (extent.north - point.y) / dimension.y;

    return target.set(originX, originY);
}