async function loadImages(gltf, options, context) {
    const imageIndices = getReferencesImageIndices(gltf);
    const images = gltf.json.images || [];
    const promises = [];
    for (const imageIndex of imageIndices) {
      promises.push(loadImage(gltf, images[imageIndex], imageIndex, options, context));
    }
    return await Promise.all(promises);
  }