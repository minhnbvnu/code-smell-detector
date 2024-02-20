function* makeMeshPrimitiveIterator(scenegraph) {
    for (const mesh of scenegraph.json.meshes || []) {
      for (const primitive of mesh.primitives) {
        yield primitive;
      }
    }
  }