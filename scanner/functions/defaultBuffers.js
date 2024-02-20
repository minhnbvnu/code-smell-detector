function defaultBuffers(params) {
    params.buildIndexAndUv_0 = true;
    params.center = params.builder.center(params.extent).clone();
    const buffers = computeBuffers(params);
    buffers.index = new THREE.BufferAttribute(buffers.index, 1);
    buffers.uvs[0] = new THREE.BufferAttribute(buffers.uvs[0], 2);
    buffers.position = new THREE.BufferAttribute(buffers.position, 3);
    buffers.normal = new THREE.BufferAttribute(buffers.normal, 3);
    for (let i = 1; i < params.builder.uvCount; i++) {
        buffers.uvs[1] = new THREE.BufferAttribute(buffers.uvs[1], 1);
    }
    return buffers;
}