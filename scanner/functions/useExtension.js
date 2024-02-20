function useExtension(extensionName, options) {
    const excludes = options?.gltf?.excludeExtensions || {};
    const exclude = extensionName in excludes && !excludes[extensionName];
    return !exclude;
  }