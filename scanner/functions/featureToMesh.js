function featureToMesh(feature, options) {
    if (!feature.vertices) {
        return;
    }

    let mesh;
    switch (feature.type) {
        case FEATURE_TYPES.POINT:
            if (style.point?.model?.object) {
                try {
                    mesh = pointsToInstancedMeshes(feature);
                    mesh.isInstancedMesh = true;
                } catch (e) {
                    mesh = featureToPoint(feature, options);
                }
            } else {
                mesh = featureToPoint(feature, options);
            }
            break;
        case FEATURE_TYPES.LINE:
            mesh = featureToLine(feature, options);
            break;
        case FEATURE_TYPES.POLYGON:
            if (style.fill && Object.keys(style.fill).includes('extrusion_height')) {
                mesh = featureToExtrudedPolygon(feature, options);
            } else {
                mesh = featureToPolygon(feature, options);
            }
            break;
        default:
    }

    if (!mesh.isInstancedMesh) {
        mesh.material.vertexColors = true;
        mesh.material.color = new THREE.Color(0xffffff);
    }
    mesh.feature = feature;

    return mesh;
}