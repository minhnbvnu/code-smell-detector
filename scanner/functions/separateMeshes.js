function separateMeshes(object3D) {
    const meshes = [];
    object3D.updateMatrixWorld();
    object3D.traverse((element) => {
        if (element instanceof THREE.Mesh) {
            element.updateMatrixWorld();
            element.geometry.applyMatrix4(element.matrixWorld);
            meshes.push(element);
        }
    });

    return meshes;
}