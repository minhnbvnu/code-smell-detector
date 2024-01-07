function calculateTangents(positions, normals, uvs, indices) {
    // Lengyel's Method
    // http://web.archive.org/web/20180620024439/http://www.terathon.com/code/tangent.html
    const triangleCount = indices.length / 3;
    const vertexCount   = positions.length / 3;
    const v1   = new Vec3();
    const v2   = new Vec3();
    const v3   = new Vec3();
    const w1   = new Vec2();
    const w2   = new Vec2();
    const w3   = new Vec2();
    const sdir = new Vec3();
    const tdir = new Vec3();
    const tan1 = new Float32Array(vertexCount * 3);
    const tan2 = new Float32Array(vertexCount * 3);

    const tangents = [];

    for (let i = 0; i < triangleCount; i++) {
        const i1 = indices[i * 3];
        const i2 = indices[i * 3 + 1];
        const i3 = indices[i * 3 + 2];

        v1.set(positions[i1 * 3], positions[i1 * 3 + 1], positions[i1 * 3 + 2]);
        v2.set(positions[i2 * 3], positions[i2 * 3 + 1], positions[i2 * 3 + 2]);
        v3.set(positions[i3 * 3], positions[i3 * 3 + 1], positions[i3 * 3 + 2]);

        w1.set(uvs[i1 * 2], uvs[i1 * 2 + 1]);
        w2.set(uvs[i2 * 2], uvs[i2 * 2 + 1]);
        w3.set(uvs[i3 * 2], uvs[i3 * 2 + 1]);

        const x1 = v2.x - v1.x;
        const x2 = v3.x - v1.x;
        const y1 = v2.y - v1.y;
        const y2 = v3.y - v1.y;
        const z1 = v2.z - v1.z;
        const z2 = v3.z - v1.z;

        const s1 = w2.x - w1.x;
        const s2 = w3.x - w1.x;
        const t1 = w2.y - w1.y;
        const t2 = w3.y - w1.y;

        const area = s1 * t2 - s2 * t1;

        // Area can be 0 for degenerate triangles or bad uv coordinates
        if (area === 0) {
            // Fallback to default values
            sdir.set(0, 1, 0);
            tdir.set(1, 0, 0);
        } else {
            const r = 1 / area;
            sdir.set((t2 * x1 - t1 * x2) * r,
                     (t2 * y1 - t1 * y2) * r,
                     (t2 * z1 - t1 * z2) * r);
            tdir.set((s1 * x2 - s2 * x1) * r,
                     (s1 * y2 - s2 * y1) * r,
                     (s1 * z2 - s2 * z1) * r);
        }

        tan1[i1 * 3 + 0] += sdir.x;
        tan1[i1 * 3 + 1] += sdir.y;
        tan1[i1 * 3 + 2] += sdir.z;
        tan1[i2 * 3 + 0] += sdir.x;
        tan1[i2 * 3 + 1] += sdir.y;
        tan1[i2 * 3 + 2] += sdir.z;
        tan1[i3 * 3 + 0] += sdir.x;
        tan1[i3 * 3 + 1] += sdir.y;
        tan1[i3 * 3 + 2] += sdir.z;

        tan2[i1 * 3 + 0] += tdir.x;
        tan2[i1 * 3 + 1] += tdir.y;
        tan2[i1 * 3 + 2] += tdir.z;
        tan2[i2 * 3 + 0] += tdir.x;
        tan2[i2 * 3 + 1] += tdir.y;
        tan2[i2 * 3 + 2] += tdir.z;
        tan2[i3 * 3 + 0] += tdir.x;
        tan2[i3 * 3 + 1] += tdir.y;
        tan2[i3 * 3 + 2] += tdir.z;
    }

    const t1 = new Vec3();
    const t2 = new Vec3();
    const n = new Vec3();
    const temp = new Vec3();

    for (let i = 0; i < vertexCount; i++) {
        n.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
        t1.set(tan1[i * 3], tan1[i * 3 + 1], tan1[i * 3 + 2]);
        t2.set(tan2[i * 3], tan2[i * 3 + 1], tan2[i * 3 + 2]);

        // Gram-Schmidt orthogonalize
        const ndott = n.dot(t1);
        temp.copy(n).mulScalar(ndott);
        temp.sub2(t1, temp).normalize();

        tangents[i * 4]     = temp.x;
        tangents[i * 4 + 1] = temp.y;
        tangents[i * 4 + 2] = temp.z;

        // Calculate handedness
        temp.cross(n, t1);
        tangents[i * 4 + 3] = (temp.dot(t2) < 0.0) ? -1.0 : 1.0;
    }

    return tangents;
}