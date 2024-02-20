function preprocessExtensions(gltf, options = {}, context) {
    const extensions = EXTENSIONS2.filter((extension) => useExtension(extension.name, options));
    for (const extension of extensions) {
      extension.preprocess?.(gltf, options, context);
    }
  }