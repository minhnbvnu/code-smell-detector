function getReferencesImageIndices(gltf) {
    const imageIndices = new Set();
    const textures = gltf.json.textures || [];
    for (const texture of textures) {
      if (texture.source !== void 0) {
        imageIndices.add(texture.source);
      }
    }
    return Array.from(imageIndices).sort();
  }