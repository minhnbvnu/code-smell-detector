function _readZCorrect(layer, texture, uv, tileDimensions, tileOwnerDimensions) {
    // We need to emulate the vertex shader code that does 2 thing:
    //   - interpolate (u, v) between triangle vertices: u,v will be multiple of 1/nsegments
    //     (for now assume nsegments == 16)
    //   - read elevation texture at (u, v) for

    // Determine u,v based on the vertices count.
    // 'modulo' is the gap (in [0, 1]) between 2 successive vertices in the geometry
    // e.g if you have 5 vertices, the only possible values for u (or v) are: 0, 0.25, 0.5, 0.75, 1
    // so modulo would be 0.25
    // note: currently the number of segments is hard-coded to 16 (see TileProvider) => 17 vertices
    const modulo = (tileDimensions.x / tileOwnerDimensions.x) / (17 - 1);
    let u = Math.floor(uv.x / modulo) * modulo;
    let v = Math.floor(uv.y / modulo) * modulo;

    if (u == 1) {
        u -= modulo;
    }
    if (v == 1) {
        v -= modulo;
    }

    // Build 4 vertices, 3 of them will be our triangle:
    //    11---21
    //    |   / |
    //    |  /  |
    //    | /   |
    //    21---22
    const u1 = u;
    const u2 = u + modulo;
    const v1 = v;
    const v2 = v + modulo;

    // Our multiple z-value will be weigh-blended, depending on the distance of the real point
    // so lu (resp. lv) are the weight. When lu -> 0 (resp. 1) the final value -> z at u1 (resp. u2)
    const lu = (uv.x - u) / modulo;
    const lv = (uv.y - v) / modulo;


    // Determine if we're going to read the vertices from the top-left or lower-right triangle
    // (low-right = on the line 21-22 or under the diagonal lu = 1 - lv)
    const lowerRightTriangle = (lv == 1) || lu / (1 - lv) >= 1;

    const tri = new THREE.Triangle(
        new THREE.Vector3(u1, v2),
        new THREE.Vector3(u2, v1),
        lowerRightTriangle ? new THREE.Vector3(u2, v2) : new THREE.Vector3(u1, v1));

    // bary holds the respective weight of each vertices of the triangles
    tri.getBarycoord(new THREE.Vector3(uv.x, uv.y), bary);

    const elevationLayer = layer.attachedLayers.filter(l => l.isElevationLayer)[0];

    // read the 3 interesting values
    const z1 = readTextureValueWithBilinearFiltering(elevationLayer, texture, tri.a.x, tri.a.y);
    const z2 = readTextureValueWithBilinearFiltering(elevationLayer, texture, tri.b.x, tri.b.y);
    const z3 = readTextureValueWithBilinearFiltering(elevationLayer, texture, tri.c.x, tri.c.y);

    // Blend with bary
    return z1 * bary.x + z2 * bary.y + z3 * bary.z;
}