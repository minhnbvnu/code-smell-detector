function preprocess3(gltfData, options) {
    const scene = new GLTFScenegraph(gltfData);
    const { json } = scene;
    for (const texture of json.textures || []) {
      const extension = scene.getObjectExtension(texture, KHR_TEXTURE_BASISU);
      if (extension) {
        texture.source = extension.source;
      }
      scene.removeObjectExtension(texture, KHR_TEXTURE_BASISU);
    }
    scene.removeExtension(KHR_TEXTURE_BASISU);
  }