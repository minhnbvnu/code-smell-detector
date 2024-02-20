function featureToPoint(feature, options) {
    const ptsIn = feature.vertices;
    const colors = new Uint8Array(ptsIn.length);
    const batchIds = new Uint32Array(ptsIn.length);
    const batchId = options.batchId || ((p, id) => id);

    let featureId = 0;
    const vertices = new Float32Array(ptsIn);
    inverseScale.setFromMatrixScale(context.collection.matrixWorldInverse);
    normal.set(0, 0, 1).multiply(inverseScale);

    const pointMaterialSize = [];
    context.setFeature(feature);

    for (const geometry of feature.geometries) {
        const start = geometry.indices[0].offset;
        const count = geometry.indices[0].count;
        const end = start + count;
        const id = batchId(geometry.properties, featureId);
        context.setGeometry(geometry);

        for (let v = start * 3, j = start; j < end; v += 3, j += 1) {
            if (feature.normals) {
                normal.fromArray(feature.normals, v).multiply(inverseScale);
            }

            coord.copy(context.setLocalCoordinatesFromArray(feature.vertices, v));
            style.setContext(context);
            const { base_altitude, color, radius } = style.point;
            coord.z = 0;

            if (!pointMaterialSize.includes(radius)) {
                pointMaterialSize.push(radius);
            }

            // populate vertices
            base.copy(normal).multiplyScalar(base_altitude).add(coord).toArray(vertices, v);
            toColor(color).multiplyScalar(255).toArray(colors, v);
            batchIds[j] = id;
        }
        featureId++;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
    geom.setAttribute('batchId', new THREE.BufferAttribute(batchIds, 1));

    options.pointMaterial.size = pointMaterialSize[0];
    if (pointMaterialSize.length > 1) {
        // TODO CREATE material for each feature
        console.warn('Too many differents point.radius, only the first one will be used');
    }

    return new THREE.Points(geom, options.pointMaterial);
}