function createTextMesh(device, meshInfo) {
    const mesh = new Mesh(device);

    mesh.setPositions(meshInfo.positions);
    mesh.setNormals(meshInfo.normals);
    mesh.setColors32(meshInfo.colors);
    mesh.setUvs(0, meshInfo.uvs);
    mesh.setIndices(meshInfo.indices);
    mesh.setVertexStream(SEMANTIC_ATTR8, meshInfo.outlines, 3, undefined, TYPE_FLOAT32, false);
    mesh.setVertexStream(SEMANTIC_ATTR9, meshInfo.shadows, 3, undefined, TYPE_FLOAT32, false);

    mesh.update();
    return mesh;
}