function _readZ(layer, method, coord, nodes, cache) {
    const pt = coord.as(layer.extent.crs, temp.coord1);

    let tileWithValidElevationTexture = null;
    // first check in cache
    if (cache?.tile?.material) {
        tileWithValidElevationTexture = tileAt(pt, cache.tile);
    }
    for (let i = 0; !tileWithValidElevationTexture && i < nodes.length; i++) {
        tileWithValidElevationTexture = tileAt(pt, nodes[i]);
    }

    if (!tileWithValidElevationTexture) {
        // failed to find a tile, abort
        return;
    }

    const tile = tileWithValidElevationTexture;
    const tileLayer = tile.material.getElevationLayer();
    const src = tileLayer.textures[0];

    // check cache value if existing
    if (cache) {
        if (cache.id === src.id && cache.version === src.version) {
            return { coord: pt, texture: src, tile };
        }
    }

    // Assuming that tiles are split in 4 children, we lookup the parent that
    // really owns this texture
    const stepsUpInHierarchy = Math.round(Math.log2(1.0 / tileLayer.offsetScales[0].z));
    for (let i = 0; i < stepsUpInHierarchy; i++) {
        tileWithValidElevationTexture = tileWithValidElevationTexture.parent;
    }

    // offset = offset from top-left
    offsetInExtent(pt, tileWithValidElevationTexture.extent, temp.offset);

    // At this point we have:
    //   - tileWithValidElevationTexture.texture.image which is the current image
    //     used for rendering
    //   - offset which is the offset in this texture for the coordinate we're
    //     interested in
    // We now have 2 options:
    //   - the fast one: read the value of tileWithValidElevationTexture.texture.image
    //     at (offset.x, offset.y) and we're done
    //   - the correct one: emulate the vertex shader code
    if (method == PRECISE_READ_Z) {
        pt.z = _readZCorrect(layer, src, temp.offset, tile.extent.planarDimensions(), tileWithValidElevationTexture.extent.planarDimensions());
    } else {
        pt.z = _readZFast(layer, src, temp.offset);
    }

    if (pt.z != undefined) {
        return { coord: pt, texture: src, tile };
    }
}