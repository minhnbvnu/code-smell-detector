function createInstancedMesh(mesh, count, ptsIn) {
    const instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, count);
    let index = 0;
    for (let i = 0; i < count * 3; i += 3) {
        const mat = new THREE.Matrix4();
        mat.setPosition(ptsIn[i], ptsIn[i + 1], ptsIn[i + 2]);
        instancedMesh.setMatrixAt(index, mat);
        index++;
    }

    instancedMesh.instanceMatrix.needsUpdate = true;

    return instancedMesh;
}