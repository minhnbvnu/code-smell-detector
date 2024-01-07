function createMesh(device, positions, opts) {

    const mesh = new Mesh(device);
    mesh.setPositions(positions);

    if (opts) {
        if (opts.normals) {
            mesh.setNormals(opts.normals);
        }

        if (opts.tangents) {
            mesh.setVertexStream(SEMANTIC_TANGENT, opts.tangents, 4);
        }

        if (opts.colors) {
            mesh.setColors32(opts.colors);
        }

        if (opts.uvs) {
            mesh.setUvs(0, opts.uvs);
        }

        if (opts.uvs1) {
            mesh.setUvs(1, opts.uvs1);
        }

        if (opts.blendIndices) {
            mesh.setVertexStream(SEMANTIC_BLENDINDICES, opts.blendIndices, 4, opts.blendIndices.length / 4, TYPE_UINT8);
        }

        if (opts.blendWeights) {
            mesh.setVertexStream(SEMANTIC_BLENDWEIGHT, opts.blendWeights, 4);
        }

        if (opts.indices) {
            mesh.setIndices(opts.indices);
        }
    }

    mesh.update();
    return mesh;
}