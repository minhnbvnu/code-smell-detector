async function decodeExtensions(gltf, options = {}, context) {
    const extensions = EXTENSIONS2.filter((extension) => useExtension(extension.name, options));
    for (const extension of extensions) {
      await extension.decode?.(gltf, options, context);
    }
  }