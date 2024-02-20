function _updateVector3(layer, method, nodes, vecCRS, vec, offset, matrices = {}, coords, cache) {
    const coord = coords || new Coordinates(vecCRS);
    if (matrices.worldFromLocal) {
        coord.setFromVector3(temp.v.copy(vec).applyMatrix4(matrices.worldFromLocal));
    } else {
        coord.setFromVector3(vec);
    }

    const result = DEMUtils.getTerrainObjectAt(layer, coord, method, nodes, cache);
    if (result) {
        result.coord.z += offset;
        result.coord.as(vecCRS, temp.coord2).toVector3(vec);
        if (matrices.localFromWorld) {
            vec.applyMatrix4(matrices.localFromWorld);
        }
        return { id: result.texture.id, version: result.texture.version, tile: result.tile };
    }
}