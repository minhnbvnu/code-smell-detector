function pointsToInstancedMeshes(feature) {
    const ptsIn = feature.vertices;
    const count = feature.geometries.length;
    const modelObject = style.point.model.object;

    if (modelObject instanceof THREE.Mesh) {
        return createInstancedMesh(modelObject, count, ptsIn);
    } else if (modelObject instanceof THREE.Object3D) {
        const group = new THREE.Group();
        // Get independent meshes from more complexe object
        const meshes = separateMeshes(modelObject);
        meshes.forEach(mesh => group.add(createInstancedMesh(mesh, count, ptsIn)));
        return group;
    } else {
        throw new Error('The format of the model object provided in the style (layer.style.point.model.object) is not supported. Only THREE.Mesh or THREE.Object3D are supported.');
    }
}