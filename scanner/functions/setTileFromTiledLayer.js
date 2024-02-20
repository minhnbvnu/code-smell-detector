function setTileFromTiledLayer(tile, tileLayer) {
    if (tileLayer.diffuse) {
        tile.material.diffuse = tileLayer.diffuse;
    }

    if (__DEBUG__) {
        tile.material.showOutline = tileLayer.showOutline || false;
    }

    if (tileLayer.isGlobeLayer) {
        // Computes a point used for horizon culling.
        // If the point is below the horizon,
        // the tile is guaranteed to be below the horizon as well.
        tile.horizonCullingPoint = tile.extent.center().as('EPSG:4978').toVector3();
        tile.extent.planarDimensions(dimensions).multiplyScalar(THREE.MathUtils.DEG2RAD);

        // alpha is maximum angle between two points of tile
        const alpha = dimensions.length();
        const h = Math.abs(1.0 / Math.cos(alpha * 0.5));
        tile.horizonCullingPoint.setLength(h * tile.horizonCullingPoint.length());
        tile.horizonCullingPointElevationScaled = tile.horizonCullingPoint.clone();
    }
}