async function decode5(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    gltfScenegraph.removeExtension(KHR_MATERIALS_UNLIT);
    for (const material of json.materials || []) {
      const extension = material.extensions && material.extensions.KHR_materials_unlit;
      if (extension) {
        material.unlit = true;
      }
      gltfScenegraph.removeObjectExtension(material, KHR_MATERIALS_UNLIT);
    }
  }