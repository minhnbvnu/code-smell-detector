function featureToLine(feature, options) {
    const ptsIn = feature.vertices;
    const colors = new Uint8Array(ptsIn.length);
    const count = ptsIn.length / 3;

    const batchIds = new Uint32Array(count);
    const batchId = options.batchId || ((p, id) => id);
    let featureId = 0;

    const vertices = new Float32Array(ptsIn.length);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const lineMaterialWidth = [];
    context.setFeature(feature);

    const countIndices = (count - feature.geometries.length) * 2;
    const indices = getIntArrayFromSize(countIndices, count);

    let i = 0;
    inverseScale.setFromMatrixScale(context.collection.matrixWorldInverse);
    normal.set(0, 0, 1).multiply(inverseScale);
    // Multi line case
    for (const geometry of feature.geometries) {
        context.setGeometry(geometry);
        const id = batchId(geometry.properties, featureId);

        const start = geometry.indices[0].offset;
        // To avoid integer overflow with indice value (16 bits)
        if (start > 0xffff) {
            console.warn('Feature to Line: integer overflow, too many points in lines');
            break;
        }
        const count = geometry.indices[0].count;
        const end = start + count;

        for (let v = start * 3, j = start; j < end; v += 3, j += 1) {
            if (j < end - 1) {
                if (j < 0xffff) {
                    indices[i++] = j;
                    indices[i++] = j + 1;
                } else {
                    break;
                }
            }
            if (feature.normals) {
                normal.fromArray(feature.normals, v).multiply(inverseScale);
            }

            coord.copy(context.setLocalCoordinatesFromArray(feature.vertices, v));
            style.setContext(context);
            const { base_altitude, color, width } = style.stroke;
            coord.z = 0;

            if (!lineMaterialWidth.includes(width)) {
                lineMaterialWidth.push(width);
            }

            // populate geometry buffers
            base.copy(normal).multiplyScalar(base_altitude).add(coord).toArray(vertices, v);
            toColor(color).multiplyScalar(255).toArray(colors, v);
            batchIds[j] = id;
        }
        featureId++;
    }
    options.lineMaterial.linewidth = lineMaterialWidth[0];
    if (lineMaterialWidth.length > 1) {
        // TODO CREATE material for each feature
        console.warn('Too many differents stroke.width, only the first one will be used');
    }
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
    geom.setAttribute('batchId', new THREE.BufferAttribute(batchIds, 1));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    return new THREE.LineSegments(geom, options.lineMaterial);
}