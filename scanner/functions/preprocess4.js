function preprocess4(gltfData, options, context) {
    const scenegraph = new GLTFScenegraph(gltfData);
    for (const primitive of makeMeshPrimitiveIterator(scenegraph)) {
      if (scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION)) {
      }
    }
  }