function featureToExtrudedPolygon(feature, options) {
    const ptsIn = feature.vertices;
    const vertices = new Float32Array(ptsIn.length * 2);
    const totalVertices = ptsIn.length / 3;

    const colors = new Uint8Array(ptsIn.length * 2);

    const indices = [];

    const batchIds = new Uint32Array(vertices.length / 3);
    const batchId = options.batchId || ((p, id) => id);

    let featureId = 0;

    context.setFeature(feature);
    inverseScale.setFromMatrixScale(context.collection.matrixWorldInverse);
    normal.set(0, 0, 1).multiply(inverseScale);
    coord.setCrs(context.collection.crs);

    for (const geometry of feature.geometries) {
        context.setGeometry(geometry);

        const start = geometry.indices[0].offset;
        const lastIndice = geometry.indices.slice(-1)[0];
        const end = lastIndice.offset + lastIndice.count;
        const count = end - start;
        const isClockWise = geometry.indices[0].ccw ?? (area(ptsIn, start, count) < 0);

        const startIn = start * 3;
        const startTop = start + totalVertices;
        const endIn = startIn + count * 3;
        const id = batchId(geometry.properties, featureId);

        for (let i = startIn, t = startIn + ptsIn.length, b = start; i < endIn; i += 3, t += 3, b += 1) {
            if (feature.normals) {
                normal.fromArray(feature.normals, i).multiply(inverseScale);
            }

            coord.copy(context.setLocalCoordinatesFromArray(ptsIn, i));

            style.setContext(context);
            const { base_altitude, extrusion_height, color } = style.fill;
            coord.z = 0;

            // populate base geometry buffers
            base.copy(normal).multiplyScalar(base_altitude).add(coord).toArray(vertices, i);
            batchIds[b] = id;

            // populate top geometry buffers
            extrusion.copy(normal).multiplyScalar(extrusion_height).add(base).toArray(vertices, t);
            batchIds[b + totalVertices] = id;

            // coloring base and top mesh
            const meshColor = toColor(color).multiplyScalar(255);
            meshColor.toArray(colors, t); // top
            meshColor.multiplyScalar(0.5).toArray(colors, i); // base is half dark
        }

        featureId++;

        const endTop = end + totalVertices;

        const geomVertices = vertices.slice(startTop * 3, endTop * 3);
        const holesOffsets = geometry.indices.map(i => i.offset - start).slice(1);
        const triangles = Earcut(geomVertices, holesOffsets, 3);

        const startIndice = indices.length;
        indices.length += triangles.length;

        for (let i = 0; i < triangles.length; i++) {
            indices[startIndice + i] = triangles[i] + startTop;
        }

        // add extruded contour
        addExtrudedPolygonSideFaces(
            indices,
            totalVertices,
            geometry.indices[0].offset,
            geometry.indices[0].count,
            isClockWise);

        // add extruded holes
        for (let i = 1; i < geometry.indices.length; i++) {
            const indice = geometry.indices[i];
            addExtrudedPolygonSideFaces(
                indices,
                totalVertices,
                indice.offset,
                indice.count,
                !(indice.ccw ?? isClockWise));
        }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
    geom.setAttribute('batchId', new THREE.BufferAttribute(batchIds, 1));

    geom.setIndex(new THREE.BufferAttribute(getIntArrayFromSize(indices, vertices.length / 3), 1));

    return new THREE.Mesh(geom, options.polygonMaterial);
}