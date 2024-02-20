function preprocess2(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    if (!_isImageFormatSupported("image/webp")) {
      if (scenegraph.getRequiredExtensions().includes(EXT_TEXTURE_WEBP)) {
        throw new Error(`gltf: Required extension ${EXT_TEXTURE_WEBP} not supported by browser`);
      }
      return;
    }
    const { json } = scenegraph;
    for (const texture of json.textures || []) {
      const extension = scenegraph.getObjectExtension(texture, EXT_TEXTURE_WEBP);
      if (extension) {
        texture.source = extension.source;
      }
      scenegraph.removeObjectExtension(texture, EXT_TEXTURE_WEBP);
    }
    scenegraph.removeExtension(EXT_TEXTURE_WEBP);
  }