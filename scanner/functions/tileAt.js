function tileAt(pt, tile) {
    if (tile.extent) {
        if (!tile.extent.isPointInside(pt)) {
            return undefined;
        }

        for (let i = 0; i < tile.children.length; i++) {
            const t = tileAt(pt, tile.children[i]);
            if (t) {
                return t;
            }
        }
        const tileLayer = tile.material.getElevationLayer();
        if (tileLayer && tileLayer.level >= 0) {
            return tile;
        }
        return undefined;
    }
}