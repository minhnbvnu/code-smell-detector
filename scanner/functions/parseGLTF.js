async function parseGLTF(gltf, arrayBufferOrString, byteOffset = 0, options, context) {
    parseGLTFContainerSync(gltf, arrayBufferOrString, byteOffset, options);
    normalizeGLTFV1(gltf, { normalize: options?.gltf?.normalize });
    preprocessExtensions(gltf, options, context);
    const promises = [];
    if (options?.gltf?.loadBuffers && gltf.json.buffers) {
      await loadBuffers(gltf, options, context);
    }
    if (options?.gltf?.loadImages) {
      const promise2 = loadImages(gltf, options, context);
      promises.push(promise2);
    }
    const promise = decodeExtensions(gltf, options, context);
    promises.push(promise);
    await Promise.all(promises);
    return options?.gltf?.postProcess ? postProcessGLTF(gltf, options) : gltf;
  }