async function decode3(gltfData, options, context) {
    if (!options?.gltf?.decompressMeshes) {
      return;
    }
    const scenegraph = new GLTFScenegraph(gltfData);
    const promises = [];
    for (const primitive of makeMeshPrimitiveIterator(scenegraph)) {
      if (scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION)) {
        promises.push(decompressPrimitive(scenegraph, primitive, options, context));
      }
    }
    await Promise.all(promises);
    scenegraph.removeExtension(KHR_DRACO_MESH_COMPRESSION);
  }