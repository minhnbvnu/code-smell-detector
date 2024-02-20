function normalizeGLTFV1(gltf, options = {}) {
    return new GLTFV1Normalizer().normalize(gltf, options);
  }