function createPlane(device, opts = {}) {
    // Check the supplied options and provide defaults for unspecified ones
    const he = opts.halfExtents ?? new Vec2(0.5, 0.5);
    const ws = opts.widthSegments ?? 5;
    const ls = opts.lengthSegments ?? 5;
    const calcTangents = opts.calculateTangents ?? false;

    // Variable declarations
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];

    // Generate plane as follows (assigned UVs denoted at corners):
    // (0,1)x---------x(1,1)
    //      |         |
    //      |         |
    //      |    O--X |length
    //      |    |    |
    //      |    Z    |
    // (0,0)x---------x(1,0)
    // width
    let vcounter = 0;

    for (let i = 0; i <= ws; i++) {
        for (let j = 0; j <= ls; j++) {
            const x = -he.x + 2 * he.x * i / ws;
            const y = 0.0;
            const z = -(-he.y + 2 * he.y * j / ls);
            const u = i / ws;
            const v = j / ls;

            positions.push(x, y, z);
            normals.push(0, 1, 0);
            uvs.push(u, 1 - v);

            if ((i < ws) && (j < ls)) {
                indices.push(vcounter + ls + 1, vcounter + 1, vcounter);
                indices.push(vcounter + ls + 1, vcounter + ls + 2, vcounter + 1);
            }

            vcounter++;
        }
    }

    const options = {
        normals: normals,
        uvs: uvs,
        uvs1: uvs, // UV1 = UV0 for plane
        indices: indices
    };

    if (calcTangents) {
        options.tangents = calculateTangents(positions, normals, uvs, indices);
    }

    return createMesh(device, positions, options);
}