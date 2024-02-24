function preprocess5(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    for (const image of json.images || []) {
      const extension = gltfScenegraph.getObjectExtension(image, KHR_BINARY_GLTF);
      if (extension) {
        Object.assign(image, extension);
      }
      gltfScenegraph.removeObjectExtension(image, KHR_BINARY_GLTF);
    }
    if (json.buffers && json.buffers[0]) {
      delete json.buffers[0].uri;
    }
    gltfScenegraph.removeExtension(KHR_BINARY_GLTF);
  }