function featureToPolygon(feature, options) {
    const vertices = new Float32Array(feature.vertices);
    const colors = new Uint8Array(feature.vertices.length);
    const indices = [];

    const batchIds = new Uint32Array(vertices.length / 3);
    const batchId = options.batchId || ((p, id) => id);
    context.setFeature(feature);

    inverseScale.setFromMatrixScale(context.collection.matrixWorldInverse);
    normal.set(0, 0, 1).multiply(inverseScale);
    let featureId = 0;

    for (const geometry of feature.geometries) {
        const start = geometry.indices[0].offset;
        // To avoid integer overflow with index value (32 bits)
        if (start > maxValueUint32) {
            console.warn('Feature to Polygon: integer overflow, too many points in polygons');
            break;
        }
        context.setGeometry(geometry);

        const lastIndice = geometry.indices.slice(-1)[0];
        const end = lastIndice.offset + lastIndice.count;
        const count = end - start;
        const startIn = start * 3;
        const endIn = startIn + count * 3;
        const id = batchId(geometry.properties, featureId);

        for (let i = startIn, b = start; i < endIn; i += 3, b += 1) {
            if (feature.normals) {
                normal.fromArray(feature.normals, i).multiply(inverseScale);
            }

            coord.copy(context.setLocalCoordinatesFromArray(feature.vertices, i));
            style.setContext(context);
            const { base_altitude, color } = style.fill;
            coord.z = 0;

            // populate geometry buffers
            base.copy(normal).multiplyScalar(base_altitude).add(coord).toArray(vertices, i);
            batchIds[b] = id;
            toColor(color).multiplyScalar(255).toArray(colors, i);
        }

        featureId++;

        const geomVertices = vertices.slice(start * 3, end * 3);
        const holesOffsets = geometry.indices.map(i => i.offset - start).slice(1);
        const triangles = Earcut(geomVertices, holesOffsets, 3);

        const startIndice = indices.length;
        indices.length += triangles.length;

        for (let i = 0; i < triangles.length; i++) {
            indices[startIndice + i] = triangles[i] + start;
        }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
    geom.setAttribute('batchId', new THREE.BufferAttribute(batchIds, 1));

    geom.setIndex(new THREE.BufferAttribute(getIntArrayFromSize(indices, vertices.length / 3), 1));

    return new THREE.Mesh(geom, options.polygonMaterial);
}